const {
  Payment,
  PaymentReviewLog,
  ProgramApplication,
  Track,
} = require('../models');
const {
  sendPaymentVerifiedEmail,
  sendPaymentRejectedEmail,
} = require('../utils/paymentEmails');
const { FRONTEND_ORIGIN } = require('../config/payments');

/** Route the applicant back to their token-protected status page. */
const statusUrlFor = (applicant) =>
  `${FRONTEND_ORIGIN}/apply/${encodeURIComponent(applicant.status_token)}`;

/** GET /api/payment-reviews — filters: ?status=&track=&installment=. */
exports.list = async (req, res) => {
  try {
    const where = {};
    if (req.query.status) {
      where.status = String(req.query.status).trim();
    }
    if (req.query.installment) {
      where.installment_number = Number(req.query.installment);
      if (Number.isNaN(where.installment_number)) delete where.installment_number;
    }

    if (req.query.track) {
      const trackName = String(req.query.track).trim();
      const track =
        (await Track.findOne({ where: { name: trackName } })) ||
        (await Track.findOne({ where: { key: trackName } }));
      where.track_id = track ? track.id : null;
    }

    const data = await Payment.findAll({
      where,
      include: [
        { model: ProgramApplication, as: 'applicant' },
        { model: Track, as: 'track' },
        { model: PaymentReviewLog, as: 'reviews', separate: true, order: [['createdAt', 'ASC']] },
      ],
      order: [['submitted_at', 'DESC']],
    });

    return res.json({ success: true, data });
  } catch (err) {
    console.error('List payment reviews error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

/** PATCH /api/payment-reviews/:id/approve — body: { program_start_date? } */
exports.approve = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [
        { model: ProgramApplication, as: 'applicant' },
        { model: Track, as: 'track' },
      ],
    });
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }
    if (payment.status === 'verified') {
      return res.status(409).json({ success: false, error: 'Payment is already verified.' });
    }

    const adminEmail = String(req.admin?.email || 'admin');

    // Set the program start date when supplied (drives Blockchain
    // installment-2 due dates).
    const startDate = req.body?.program_start_date || null;
    if (startDate) {
      payment.applicant.program_start_date = String(startDate).slice(0, 10);
    }

    payment.status = 'verified';
    payment.installment_status = 'paid';
    payment.reviewed_at = new Date();
    payment.reviewed_by = adminEmail;
    payment.rejection_reason = null;
    await payment.save();

    const totalInstallments = payment.track ? payment.track.total_installments : 1;
    const isFinalInstallment =
      !totalInstallments || totalInstallments <= 1 || payment.installment_number >= totalInstallments;

    // Applicant-level status: awaiting-next-installment for Blockchain
    // installment 1, enrolled otherwise.
    payment.applicant.status =
      totalInstallments > 1 && !isFinalInstallment
        ? 'awaiting-next-installment'
        : 'enrolled';
    await payment.applicant.save();

    await PaymentReviewLog.create({
      payment_id: payment.id,
      action: 'approved',
      actor: adminEmail,
      note: startDate
        ? `Verified by ${adminEmail}. Program start date set to ${startDate}.`
        : `Verified by ${adminEmail}.`,
    });

    sendPaymentVerifiedEmail({
      name: payment.applicant.name,
      email: payment.applicant.email,
      trackName: payment.track ? payment.track.name : payment.applicant.track,
      amount: payment.amount,
      installment: payment.installment_number,
      totalInstallments,
      isFinalInstallment,
      nonRefundable: payment.non_refundable,
    }).catch((err) => console.error('Verified email error:', err.message));

    return res.json({
      success: true,
      data: {
        id: payment.id,
        status: payment.status,
        applicantStatus: payment.applicant.status,
        installmentStatus: payment.installment_status,
      },
    });
  } catch (err) {
    console.error('Approve payment error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

/** PATCH /api/payment-reviews/:id/reject — body: { reason? } */
exports.reject = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [
        { model: ProgramApplication, as: 'applicant' },
        { model: Track, as: 'track' },
      ],
    });
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }
    if (payment.status === 'verified') {
      return res.status(409).json({ success: false, error: 'A verified payment cannot be rejected.' });
    }

    const adminEmail = String(req.admin?.email || 'admin');
    const reason = String(req.body?.reason || '').trim().slice(0, 2000) || null;

    payment.status = 'rejected';
    payment.rejection_reason = reason;
    payment.reviewed_at = new Date();
    payment.reviewed_by = adminEmail;
    await payment.save();

    await PaymentReviewLog.create({
      payment_id: payment.id,
      action: 'rejected',
      actor: adminEmail,
      note: reason || 'Rejected by reviewer.',
    });

    sendPaymentRejectedEmail({
      name: payment.applicant.name,
      email: payment.applicant.email,
      trackName: payment.track ? payment.track.name : payment.applicant.track,
      amount: payment.amount,
      installment: payment.installment_number,
      totalInstallments: payment.track ? payment.track.total_installments : 1,
      rejectionReason: reason,
      statusUrl: statusUrlFor(payment.applicant),
    }).catch((err) => console.error('Rejected email error:', err.message));

    return res.json({
      success: true,
      data: { id: payment.id, status: payment.status },
    });
  } catch (err) {
    console.error('Reject payment error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};