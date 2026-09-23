'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sponsorship extends Model {
    static associate(models) {}
  }

  Sponsorship.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation: {
        type: DataTypes.STRING,
        allowNull: false,
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
      interests: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      budget: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      metrics: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      payment_reference: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'none',
      },
      payment_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      payment_paid_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Sponsorship',
      tableName: 'sponsorships',
      timestamps: true,
    }
  );

  return Sponsorship;
};
