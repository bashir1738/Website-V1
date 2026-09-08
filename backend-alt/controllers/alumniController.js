const { AlumniProfile } = require('../models');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');

exports.submit = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/alumni');
      data.photo_url = result.secure_url;
    }

    const profile = await AlumniProfile.create(data);

    await sendConfirmationEmail({
      to: data.email,
      subject: 'Alumni profile submitted — Blockfuse',
      html: `<p>Hi ${data.name},</p><p>We've received your alumni profile. Once we verify it against your assessment record, it will appear in the directory.</p>`,
    });

    await notifyAdmin({
      subject: `New alumni profile: ${data.name}`,
      html: `<p><strong>${data.name}</strong> (${data.cohort}, ${data.track}) submitted an alumni profile.</p>`,
    });

    return res.status(201).json({ success: true, data: profile });
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

exports.update = async (req, res) => {
  try {
    const profile = await AlumniProfile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ success: false, error: 'Alumni profile not found' });
    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/alumni');
      data.photo_url = result.secure_url;
    }
    await profile.update(data);
    return res.json({ success: true, data: profile });
  } catch (err) {
    console.error('Update alumni error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const profile = await AlumniProfile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ success: false, error: 'Alumni profile not found' });
    await profile.destroy();
    return res.json({ success: true, message: 'Alumni profile deleted' });
  } catch (err) {
    console.error('Delete alumni error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
