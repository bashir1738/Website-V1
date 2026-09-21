const { NewsletterSubscriber } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');

exports.subscribe = async (req, res) => {
  try {
    const [subscriber, created] = await NewsletterSubscriber.findOrCreate({
      where: { email: req.body.email },
      defaults: req.body,
    });

    if (!created) {
      await subscriber.update({ name: req.body.name, topics: req.body.topics });
    }

    // Fire-and-forget: email failures must not roll back a successful DB write.
    const emailTasks = [
      sendConfirmationEmail({
        to: req.body.email,
        subject: 'Subscribed to Blockfuse Dispatch',
        html: `<p>Hi ${escHtml(req.body.name || 'there')},</p><p>You're now subscribed to the Blockfuse dispatch.</p>`,
      }),
    ];

    if (created) {
      emailTasks.push(
        notifyAdmin({
          subject: `New subscriber: ${escHtml(req.body.email)}`,
          html: `<p><strong>${escHtml(req.body.email)}</strong> subscribed to the newsletter.</p>`,
        }),
      );
    }

    Promise.all(emailTasks).catch((err) => console.error('Newsletter email error:', err));

    return res.status(201).json({ success: true, data: { id: subscriber.id } });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: subscribers });
  } catch (err) {
    console.error('Get subscribers error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};


exports.remove = async (req, res) => {
  try {
    const item = await NewsletterSubscriber.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    await item.destroy();
    return res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
