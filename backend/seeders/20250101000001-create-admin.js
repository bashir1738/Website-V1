'use strict';

module.exports = {
  async up(queryInterface) {
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('admin123', 12);
    await queryInterface.bulkInsert('admins', [
      {
        email: 'admin@blockfuse.io',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('admins', { email: 'admin@blockfuse.io' });
  },
};
