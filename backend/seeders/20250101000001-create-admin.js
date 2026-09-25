'use strict';

function getAdminEmail() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) {
    throw new Error('ADMIN_EMAIL is required');
  }
  return email;
}

module.exports = {
  async up() {
    const { Admin } = require('../models');
    const email = getAdminEmail();
    const password = process.env.ADMIN_PASSWORD;

    if (!password || password.length < 12) {
      throw new Error('ADMIN_PASSWORD must contain at least 12 characters');
    }

    const [admin, created] = await Admin.findOrCreate({
      where: { email },
      defaults: { password },
    });

    if (!created && (await admin.comparePassword('admin123'))) {
      admin.password = password;
      await admin.save();
    }
  },

  async down() {
    const { Admin } = require('../models');
    await Admin.destroy({ where: { email: getAdminEmail() } });
  },
};
