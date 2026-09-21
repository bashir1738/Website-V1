const { AlumniProfile } = require('../models');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');

exports.submit = async (req, res) => {
  try {
    const data = req.body;
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
