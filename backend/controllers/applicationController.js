const crypto = require('crypto');
const { ProgramApplication } = require('../models');
const { Op } = require('sequelize');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { sendStatusLinkEmail } = require('../utils/paymentEmails');
const { FRONTEND_ORIGIN } = require('../config/payments');

/** Opaque, unguessable lookup token for the applicant's payment/status page. */
const generateStatusToken = () => crypto.randomBytes(24).toString('hex');

exports.submit = async (req, res) => {
  try {
    const data = req.body;

    // One application per email. Block before any side effect so a duplicate
    // never hits Cloudinary or creates a second record.
    const alreadyApplied = await ProgramApplication.findOne({
      where: {
        email: { [Op.iLike]: data.email },
        status: { [Op.not]: 'rejected' },
      },
    });
    if (alreadyApplied) {
      return res.status(409).json({
        success: false,
        error: 'You have already submitted an application for this email. Check your inbox or your status page for the next steps.',
      });
    }

    if (req.file) {
      // Resumes are PDFs/DOCX — upload as raw documents, not images.
      const result = await uploadToCloudinary(req.file.buffer, 'blockfuse/resumes', 'raw');
      data.resume_url = result.secure_url;
    }

    const statusToken = generateStatusToken();
    data.status_token = statusToken;

    const application = await ProgramApplication.create(data);

    // Give the applicant a secure link to their payment instructions and
    // live status page.
    sendStatusLinkEmail({
      name: data.name,
      email: data.email,
      track: data.track,
      statusUrl: `${FRONTEND_ORIGIN}/apply/${statusToken}`,
    }).catch((err) => console.error('Status-link email error:', err.message));

    return res.status(201).json({
      success: true,
      data: { id: application.id, statusToken },
    });
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


exports.remove = async (req, res) => {
  try {
    const item = await ProgramApplication.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    await item.destroy();
    return res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};