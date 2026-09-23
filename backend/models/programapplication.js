'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProgramApplication extends Model {
    static associate(models) {}
  }

  ProgramApplication.init(
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
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      track: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      experience_level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      github: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      motivation: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      resume_url: {
        type: DataTypes.STRING,
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
      modelName: 'ProgramApplication',
      tableName: 'program_applications',
      timestamps: true,
    }
  );

  return ProgramApplication;
};
