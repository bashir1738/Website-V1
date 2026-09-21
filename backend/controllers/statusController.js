'use strict';

const ALLOWED_STATUS = ['pending', 'approved', 'rejected'];

/**
 * Factory that returns an updateStatus handler for a given Sequelize model.
 * Used by every submission collection so the admin dashboard can approve,
 * reject, or reopen entries in one place.
 */
module.exports = (Model, label = 'Item') => ({
  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status' });
      }

      const item = await Model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, error: `${label} not found` });
      }

      item.status = status;
      await item.save();

      return res.json({ success: true, data: { id: item.id, status } });
    } catch (err) {
      console.error('Update status error:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  },
});