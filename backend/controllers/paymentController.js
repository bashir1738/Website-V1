const { ProgramApplication, Payment, PaymentReviewLog, Track } = require('../models');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { uploadWindowFor } = require('../utils/paymentRules');
const {
  sendPaymentSubmittedEmails,
} = require('../utils/paymentEmails');
const {
  BANK_NAME,
  BANK_ACCOUNT_NAME,
  BANK_ACCOUNT_NUMBER,
} = require('../config/payments');

/** Route an uploaded proof buffer to Cloudinary by its true MIME type. */
const uploadProof = async (file) => {
  const resourceType = String(file.mimetype || '').startsWith('image/') ? 'image' : 'raw';
  const result = await uploadToCloudinary(
    file.buffer,
    'blockfuse/payment-proofs',
    resourceType
  );
  return result.secure_url;
};

/** POST /api/payments/upload — multipart: token, proof (file), reference_note. */
exports.submit = async (req, res) => {
  try {
    const body = req.body ?? {};
    const token = String(body.token || '').trim();
    const referenceNote = String(body.reference_note || '').trim().slice(0, 500) || null;

    if (!token) {
      return res.status(400).json({ success: false, error: 'Missing application token.' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Attach a payment proof (image or PDF).' });
    }

    const applicant = await ProgramApplication.findOne({ where: { status_token: token } });
    if (!applicant) {
      return res.status(404).json({ success: false, error: 'No application matches this token.' });
    }

    const track = await Track.findOne({ where: { name: applicant.track } });
    const payments = await Payment.findAll({
      where: { applicant_id: applicant.id },
      order: [['installment_number', 'ASC']],
    });

    const window = uploadWindowFor({ applicant, track, payments });
    if (!window.allowed) {
      return res.status(409).json({ success: false, error: window.reason });
    }

    const proofUrl = await uploadProof(req.file);

    const payment = await Payment.create({
      applicant_id: applicant.id,
      track_id: track ? track.id : null,
      amount: window.amount,
      installment_number: window.installmentNumber,
      installment_status: 'due',
      status: 'pending_review',
      proof_file: proofUrl,
      reference_note: referenceNote,
      non_refundable: true,
      submitted_at: new Date(),
    });

    await PaymentReviewLog.create({
      payment_id: payment.id,
      action: 'submitted',
      actor: applicant.email,
      note: referenceNote || 'Proof uploaded by applicant.',
    });

    // Fire-and-forget notifications; failure must not roll back the submission.
    sendPaymentSubmittedEmails({
      name: applicant.name,
      email: applicant.email,
      track: applicant.track,
      trackName: track ? track.name : null,
      amount: payment.amount,
      installment: payment.installment_number,
      totalInstallments: track ? track.total_installments : 1,
      paymentId: payment.id,
    }).catch((err) => console.error('Payment-submitted email error:', err.message));

    return res.status(201).json({
      success: true,
      data: {
        id: payment.id,
        amount: payment.amount,
        installment_number: payment.installment_number,
        status: payment.status,
      },
    });
  } catch (err) {
    console.error('Payment submit error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

/** GET /api/payments/status/:token — the applicant's instructions + live status. */
exports.status = async (req, res) => {
  try {
    const token = String(req.params.token || '').trim();
    if (!token) {
      return res.status(400).json({ success: false, error: 'Missing application token.' });
    }

    const applicant = await ProgramApplication.findOne({ where: { status_token: token } });
    if (!applicant) {
      return res.status(404).json({ success: false, error: 'No application matches this token.' });
    }

    const track = await Track.findOne({ where: { name: applicant.track } });
    const payments = await Payment.findAll({
      where: { applicant_id: applicant.id },
      order: [['installment_number', 'ASC']],
    });

    const uploadWindow = uploadWindowFor({ applicant, track, payments });

    return res.json({
      success: true,
      data: {
        applicant: {
          id: applicant.id,
          name: applicant.name,
          email: applicant.email,
          phone: applicant.phone,
          track: applicant.track,
          status: applicant.status,
          legacy: applicant.track_legacy,
        },
        track: track
          ? {
              key: track.key,
              name: track.name,
              price: track.price,
              duration: track.duration,
              description: track.description,
              totalInstallments: track.total_installments,
            }
          : null,
        payments: payments.map((payment) => ({
          id: payment.id,
          installmentNumber: payment.installment_number,
          amount: payment.amount,
          status: payment.status,
          installmentStatus: payment.installment_status,
          proofFile: payment.proof_file,
          referenceNote: payment.reference_note,
          submittedAt: payment.submitted_at,
          reviewedAt: payment.reviewed_at,
          rejectionReason: payment.rejection_reason,
          nonRefundable: payment.non_refundable,
        })),
        bank: {
          accountName: BANK_ACCOUNT_NAME,
          accountNumber: BANK_ACCOUNT_NUMBER,
          bankName: BANK_NAME,
        },
        nextUpload: uploadWindow,
        notices: {
          nonRefundable: true,
          secureSpot: true,
        },
      },
    });
  } catch (err) {
    console.error('Payment status error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};