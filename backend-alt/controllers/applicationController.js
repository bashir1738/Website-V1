const { ProgramApplication } = require('../models');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');

exports.submit = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/resumes');
      data.resume_url = result.secure_url;
    }

    const application = await ProgramApplication.create(data);

    await sendConfirmationEmail({
      to: data.email,
      subject: 'Application received — Blockfuse Academy',
      html: `<p>Hi ${data.name},</p><p>We've received your application. You'll hear back within 10 working days.</p>`,
    });

    await notifyAdmin({
      subject: `New program application from ${data.name}`,
      html: `<p><strong>${data.name}</strong> (${data.email}) applied for <em>${data.track || 'TBD'}</em>.</p>`,
    });

    return res.status(201).json({ success: true, data: application });
  } catch (err) {
    console.error('Application error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const applications = await ProgramApplication.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: applications });
  } catch (err) {
    console.error('Get applications error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const application = await ProgramApplication.findByPk(req.params.id);
    if (!application) return res.status(404).json({ success: false, error: 'Application not found' });
    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/resumes');
      data.resume_url = result.secure_url;
    }
    await application.update(data);
    return res.json({ success: true, data: application });
  } catch (err) {
    console.error('Update application error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const application = await ProgramApplication.findByPk(req.params.id);
    if (!application) return res.status(404).json({ success: false, error: 'Application not found' });
    await application.destroy();
    return res.json({ success: true, message: 'Application deleted' });
  } catch (err) {
    console.error('Delete application error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
