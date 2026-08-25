'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContactMessage extends Model {
    static associate(models) {}
  }

  ContactMessage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ContactMessage',
      tableName: 'contact_messages',
      timestamps: true,
    }
  );

  return ContactMessage;
};
