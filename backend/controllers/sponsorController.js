const { Sponsorship } = require('../models');
const { PAYMENTS_ENABLED, AMOUNTS_KOBO } = require('../config/payments');
const {
  PAYSTACK_PUBLIC_KEY,
  generateReference,
  initializePayment,
} = require('../utils/paystack');

exports.submit = async (req, res) => {
  try {
    const data = req.body;

    let paymentPayload = null;

    if (PAYMENTS_ENABLED) {
      // Fixed amount lives server-side only — never trust a client-supplied price.
      const amountKobo = AMOUNTS_KOBO.sponsorship;
      const reference = generateReference('SPON');
      // Fund the transaction at Paystack first; a failed init means no row saved.
      await initializePayment({ email: data.email, amountKobo, reference });

      data.payment_reference = reference;
      data.payment_status = 'pending';
      data.payment_amount = amountKobo;

      paymentPayload = {
        publicKey: PAYSTACK_PUBLIC_KEY,
        reference,
        amountKobo,
        email: data.email,
      };
    }

    const sponsor = await Sponsorship.create(data);

    return res.status(201).json({
      success: true,
      data: { id: sponsor.id, payment: paymentPayload },
    });
  } catch (err) {
    console.error('Sponsor error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const sponsors = await Sponsorship.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: sponsors });
  } catch (err) {
    console.error('Get sponsors error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};


exports.remove = async (req, res) => {
  try {
    const item = await Sponsorship.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    await item.destroy();
    return res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};