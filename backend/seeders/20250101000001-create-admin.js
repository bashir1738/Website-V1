'use strict';

module.exports = {
  async up() {
    const { Admin } = require('../models');

    const email = process.env.ADMIN_EMAIL || 'admin@blockfuse.io';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    const [admin, created] = await Admin.findOrCreate({
      where: { email },
      defaults: { password },
    });

    if (!created) {
      admin.password = password;
      await admin.save();
    }
  },

  async down() {
    const { Admin } = require('../models');
    await Admin.destroy({
      where: { email: process.env.ADMIN_EMAIL || 'admin@blockfuse.io' },
    });
  },
};
