'use strict';

const TABLES = ['program_applications', 'sponsorships'];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const table of TABLES) {
      await queryInterface.addColumn(table, 'payment_reference', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      });
      await queryInterface.addColumn(table, 'payment_status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'none',
      });
      await queryInterface.addColumn(table, 'payment_amount', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
      await queryInterface.addColumn(table, 'payment_paid_at', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    for (const table of TABLES) {
      await queryInterface.removeColumn(table, 'payment_paid_at');
      await queryInterface.removeColumn(table, 'payment_amount');
      await queryInterface.removeColumn(table, 'payment_status');
      await queryInterface.removeColumn(table, 'payment_reference');
    }
  },
};