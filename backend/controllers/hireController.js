const { HireRequest } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');

exports.submit = async (req, res) => {
  try {
    const hire = await HireRequest.create(req.body);

    // Fire-and-forget: email failures must not roll back a successful DB write.
    Promise.all([
      sendConfirmationEmail({
        to: req.body.email,
        subject: 'Hire request received | Blockfuse Labs',
        html: `<p>Hi ${escHtml(req.body.name)},</p><p>Thanks for your interest in hiring Blockfuse engineers. Our talent team will reach out within three working days.</p>`,
      }),
      notifyAdmin({
        subject: `New hire request from ${escHtml(req.body.company)}`,
        html: `<p><strong>${escHtml(req.body.name)}</strong> from <em>${escHtml(req.body.company)}</em> wants to hire engineers.</p>`,
      }),
    ]).catch((err) => console.error('Hire email error:', err));

    return res.status(201).json({ success: true, data: { id: hire.id } });
  } catch (err) {
    console.error('Hire request error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const requests = await HireRequest.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: requests });
  } catch (err) {
    console.error('Get hire requests error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};


exports.remove = async (req, res) => {
  try {
    const item = await HireRequest.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    await item.destroy();
    return res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
