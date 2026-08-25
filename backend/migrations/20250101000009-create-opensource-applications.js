'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('opensource_applications', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      github: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      interests: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      hours: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      focus: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('opensource_applications');
  },
};
