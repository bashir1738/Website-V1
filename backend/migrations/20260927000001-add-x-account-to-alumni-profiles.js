'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('alumni_profiles', 'x_account', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // The X account is now compulsory on submission, but existing approved
    // profiles were published before it was collected. Backfill them with an
    // empty string rather than a placeholder URL: the frontend treats a blank
    // account as "not published" and omits the icon, so no dead link is shown.
    await queryInterface.sequelize.query(
      `UPDATE alumni_profiles SET x_account = '' WHERE x_account IS NULL`,
    );

    await queryInterface.changeColumn('alumni_profiles', 'x_account', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('alumni_profiles', 'x_account');
  },
};
