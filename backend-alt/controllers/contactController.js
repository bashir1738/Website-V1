const { ContactMessage } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');

exports.submit = async (req, res) => {
  try {
    const contact = await ContactMessage.create(req.body);

    await sendConfirmationEmail({
      to: req.body.email,
      subject: 'We received your message — Blockfuse',
      html: `<p>Hi ${req.body.name},</p><p>Thanks for reaching out. We'll get back to you shortly.</p>`,
    });

    await notifyAdmin({
      subject: `New contact: ${req.body.topic}`,
      html: `<p><strong>${req.body.name}</strong> (${req.body.email}) wrote about <em>${req.body.topic}</em>:</p><p>${req.body.message}</p>`,
    });

    return res.status(201).json({ success: true, data: contact });
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

exports.update = async (req, res) => {
  try {
    const contact = await ContactMessage.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: 'Contact message not found' });
    await contact.update(req.body);
    return res.json({ success: true, data: contact });
  } catch (err) {
    console.error('Update contact error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const contact = await ContactMessage.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: 'Contact message not found' });
    await contact.destroy();
    return res.json({ success: true, message: 'Contact message deleted' });
  } catch (err) {
    console.error('Delete contact error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
