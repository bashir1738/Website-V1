'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProgramApplication extends Model {
    static associate(models) {
      ProgramApplication.hasMany(models.Payment, {
        foreignKey: 'applicant_id',
        as: 'payments',
      });
    }
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
      status_token: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      track_legacy: {
        // True for applications made under the old (pre-2026) program naming.
        // Kept for admin review; their payments carry a null track_id.
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      program_start_date: {
        // Sets the date from which Blockchain installment 2 becomes due
        // (start + 8 weeks). Assigned by an admin at enrollment.
        type: DataTypes.DATEONLY,
        allowNull: true,
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
