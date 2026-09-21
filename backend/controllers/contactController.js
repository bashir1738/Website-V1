const { ContactMessage } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');

exports.submit = async (req, res) => {
  try {
    const contact = await ContactMessage.create(req.body);

    // Fire-and-forget: email failures must not roll back a successful DB write.
    Promise.all([
      sendConfirmationEmail({
        to: req.body.email,
        subject: 'We received your message — Blockfuse',
        html: `<p>Hi ${escHtml(req.body.name)},</p><p>Thanks for reaching out. We'll get back to you shortly.</p>`,
      }),
      notifyAdmin({
        subject: `New contact: ${escHtml(req.body.topic)}`,
        html: `<p><strong>${escHtml(req.body.name)}</strong> (${escHtml(req.body.email)}) wrote about <em>${escHtml(req.body.topic)}</em>:</p><p>${escHtml(req.body.message)}</p>`,
      }),
    ]).catch((err) => console.error('Contact email error:', err));

    return res.status(201).json({ success: true, data: { id: contact.id } });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: messages });
  } catch (err) {
    console.error('Get contacts error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};


exports.remove = async (req, res) => {
  try {
    const item = await ContactMessage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    await item.destroy();
    return res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
