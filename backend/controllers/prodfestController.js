const { ProdfestRegistration } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');

exports.submit = async (req, res) => {
  try {
    const reg = await ProdfestRegistration.create(req.body);

    // Fire-and-forget: email failures must not roll back a successful DB write.
    Promise.all([
      sendConfirmationEmail({
        to: req.body.email,
        subject: 'ProdFest registration received | Blockfuse Labs',
        html: `<p>Hi ${escHtml(req.body.name)},</p><p>You're on the list for ProdFest 2026. We'll send the date and venue before it goes public.</p>`,
      }),
      notifyAdmin({
        subject: `New ProdFest registration: ${escHtml(req.body.name)}`,
        html: `<p><strong>${escHtml(req.body.name)}</strong> (${escHtml(req.body.email)}) registered for ProdFest as <em>${escHtml(req.body.attending_as || 'N/A')}</em>.</p>`,
      }),
    ]).catch((err) => console.error('ProdFest email error:', err));

    return res.status(201).json({ success: true, data: { id: reg.id } });
  } catch (err) {
    console.error('Prodfest error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const registrations = await ProdfestRegistration.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: registrations });
  } catch (err) {
    console.error('Get prodfest registrations error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};


exports.remove = async (req, res) => {
  try {
    const item = await ProdfestRegistration.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    await item.destroy();
    return res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
