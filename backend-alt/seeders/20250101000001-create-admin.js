'use strict';

module.exports = {
  async up(queryInterface) {
    const bcrypt = require('bcryptjs');
    const email = process.env.ADMIN_EMAIL || 'admin@blockfuse.io';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    const existing = await queryInterface.sequelize.query(
      'SELECT id FROM admins WHERE email = :email',
      { replacements: { email }, type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    if (existing.length > 0) {
      return;
    }

    const hash = await bcrypt.hash(password, 12);
    await queryInterface.bulkInsert('admins', [
      {
        email,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('admins', {
      email: process.env.ADMIN_EMAIL || 'admin@blockfuse.io',
    });
  },
};