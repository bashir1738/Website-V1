const { NewsletterSubscriber } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');

exports.subscribe = async (req, res) => {
  try {
    const [subscriber, created] = await NewsletterSubscriber.findOrCreate({
      where: { email: req.body.email },
      defaults: req.body,
    });

    if (!created) {
      await subscriber.update({ name: req.body.name, topics: req.body.topics });
    }

    await sendConfirmationEmail({
      to: req.body.email,
      subject: 'Subscribed to Blockfuse Dispatch',
      html: `<p>Hi ${req.body.name || 'there'},</p><p>You're now subscribed to the Blockfuse dispatch.</p>`,
    });

    if (created) {
      await notifyAdmin({
        subject: `New subscriber: ${req.body.email}`,
        html: `<p><strong>${req.body.email}</strong> subscribed to the newsletter.</p>`,
      });
    }

    return res.status(201).json({ success: true, data: subscriber });
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
