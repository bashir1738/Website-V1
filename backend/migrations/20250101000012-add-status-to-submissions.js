'use strict';

const TABLES = [
  'contact_messages',
  'program_applications',
  'hire_requests',
  'prodfest_registrations',
  'sponsorships',
  'opensource_applications',
  'alumni_profiles',
  'newsletter_subscribers',
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const table of TABLES) {
      await queryInterface.addColumn(table, 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
      });
    }
  },

  async down(queryInterface) {
    for (const table of TABLES) {
      await queryInterface.removeColumn(table, 'status');
    }
  },
};