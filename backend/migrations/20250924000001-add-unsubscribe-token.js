'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('newsletter_subscribers', 'unsubscribe_token', {
      type: Sequelize.STRING(64),
      allowNull: true,
    });

    // Backfill existing subscribers so every row already has a working
    // one-click unsubscribe link. Emails are unique, so a hash of the email is
    // a collision-free token that works identically across dialects.
    const dialect = queryInterface.sequelize.getDialect();
    let backfill;
    if (dialect === 'postgres') {
      backfill = `UPDATE newsletter_subscribers SET unsubscribe_token = md5(email) WHERE unsubscribe_token IS NULL`;
    } else if (dialect === 'mysql' || dialect === 'mariadb') {
      backfill = `UPDATE newsletter_subscribers SET unsubscribe_token = MD5(email) WHERE unsubscribe_token IS NULL`;
    } else {
      backfill = `UPDATE newsletter_subscribers SET unsubscribe_token = substr(hex(randomblob(16)), 1, 32) WHERE unsubscribe_token IS NULL`;
    }
    await queryInterface.sequelize.query(backfill);

    await queryInterface.changeColumn('newsletter_subscribers', 'unsubscribe_token', {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('newsletter_subscribers', 'unsubscribe_token');
  },
};