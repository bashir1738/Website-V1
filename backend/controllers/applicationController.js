const { ProgramApplication } = require('../models');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');

exports.submit = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      // Resumes are PDFs/DOCX — upload as raw documents, not images.
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/resumes', 'raw');
      data.resume_url = result.secure_url;
    }

    const application = await ProgramApplication.create(data);

    // Fire-and-forget: email failures must not roll back a successful DB write.
    Promise.all([
      sendConfirmationEmail({
        to: data.email,
        subject: 'Application received — Blockfuse Academy',
        html: `<p>Hi ${escHtml(data.name)},</p><p>We've received your application. You'll hear back within 10 working days.</p>`,
      }),
      notifyAdmin({
        subject: `New program application from ${escHtml(data.name)}`,
        html: `<p><strong>${escHtml(data.name)}</strong> (${escHtml(data.email)}) applied for <em>${escHtml(data.track || 'TBD')}</em>.</p>`,
      }),
    ]).catch((err) => console.error('Application email error:', err));

    return res.status(201).json({ success: true, data: { id: application.id } });
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
