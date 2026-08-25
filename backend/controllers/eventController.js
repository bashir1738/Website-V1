const { Event } = require('../models');
const { uploadToCloudinary } = require('../utils/cloudinary');

exports.getAll = async (req, res) => {
  try {
    const events = await Event.findAll({ order: [['date', 'DESC']] });
    return res.json({ success: true, data: events });
  } catch (err) {
    console.error('Get events error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({ where: { slug: req.params.slug } });
    if (!event) return res.status(404).json({ success: false, error: 'Event not found' });
    return res.json({ success: true, data: event });
  } catch (err) {
    console.error('Get event error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/events');
      data.image_url = result.secure_url;
    }
    const event = await Event.create(data);
    return res.status(201).json({ success: true, data: event });
  } catch (err) {
    console.error('Create event error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ success: false, error: 'Event not found' });

    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/events');
      data.image_url = result.secure_url;
    }
    await event.update(data);
    return res.json({ success: true, data: event });
  } catch (err) {
    console.error('Update event error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ success: false, error: 'Event not found' });
    await event.destroy();
    return res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    console.error('Delete event error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
