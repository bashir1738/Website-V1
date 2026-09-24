const { AlumniProfile } = require('../models');
const { Op } = require('sequelize');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { sendConfirmationEmail, notifyAdmin, sendAlumniApprovalEmail } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');

const ALLOWED_STATUS = ['pending', 'approved', 'rejected'];

exports.submit = async (req, res) => {
  try {
    const data = req.body;

    // One alumni profile per person. Checked before the photo upload so a
    // duplicate never consumes a Cloudinary upload. A rejected profile can be
    // corrected and re-submitted.
    const alreadySubmitted = await AlumniProfile.findOne({
      where: {
        email: { [Op.iLike]: data.email },
        status: { [Op.not]: 'rejected' },
      },
    });
    if (alreadySubmitted) {
      return res.status(409).json({
        success: false,
        error: 'You have already submitted an alumni profile. We are verifying your record.',
      });
    }

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/alumni', 'image');
      data.photo_url = result.secure_url;
    }

    const profile = await AlumniProfile.create(data);

    // Fire-and-forget: email failures must not roll back a successful DB write.
    Promise.all([
      sendConfirmationEmail({
        to: data.email,
        subject: 'Alumni profile submitted — Blockfuse',
        html: `<p>Hi ${escHtml(data.name)},</p><p>We've received your alumni profile. Once we verify it against your assessment record, it will appear in the directory.</p>`,
      }),
      notifyAdmin({
        subject: `New alumni profile: ${escHtml(data.name)}`,
        html: `<p><strong>${escHtml(data.name)}</strong> (${escHtml(data.cohort)}, ${escHtml(data.track)}) submitted an alumni profile.</p>`,
      }),
    ]).catch((err) => console.error('Alumni email error:', err));

    return res.status(201).json({ success: true, data: { id: profile.id } });
  } catch (err) {
    console.error('Alumni error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const profiles = await AlumniProfile.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: profiles });
  } catch (err) {
    console.error('Get alumni error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

/** Public listing — only approved profiles are shown to the website. */
exports.getPublic = async (req, res) => {
  try {
    const profiles = await AlumniProfile.findAll({
      where: { status: 'approved' },
      order: [['createdAt', 'DESC']],
    });
    return res.json({ success: true, data: profiles });
  } catch (err) {
    console.error('Get public alumni error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};


/** Admin approve/reject/reopen. Approving notifies the alumnus by email. */
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const profile = await AlumniProfile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, error: 'Alumni profile not found' });
    }

    const before = profile.status;
    profile.status = status;
    await profile.save();

    if (status === 'approved' && before !== 'approved') {
      // Fire-and-forget: an email failure must not roll back the approval.
      sendAlumniApprovalEmail({ email: profile.email, name: profile.name })
        .catch((err) => console.error('Alumni approval email error:', err.message));
    }

    return res.json({ success: true, data: { id: profile.id, status } });
  } catch (err) {
    console.error('Alumni status error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};


exports.remove = async (req, res) => {
  try {
    const item = await AlumniProfile.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    await item.destroy();
    return res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
