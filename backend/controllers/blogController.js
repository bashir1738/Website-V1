const { Blog } = require('../models');
const { uploadToCloudinary } = require('../utils/cloudinary');

exports.getAll = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [['published_at', 'DESC']] });
    return res.json({ success: true, data: blogs });
  } catch (err) {
    console.error('Get blogs error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ where: { slug: req.params.slug } });
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    return res.json({ success: true, data: blog });
  } catch (err) {
    console.error('Get blog error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/blogs');
      data.image_url = result.secure_url;
    }
    const blog = await Blog.create(data);
    return res.status(201).json({ success: true, data: blog });
  } catch (err) {
    console.error('Create blog error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });

    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/blogs');
      data.image_url = result.secure_url;
    }
    await blog.update(data);
    return res.json({ success: true, data: blog });
  } catch (err) {
    console.error('Update blog error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    await blog.destroy();
    return res.json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    console.error('Delete blog error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
