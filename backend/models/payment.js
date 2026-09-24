'use strict';
const { Model } = require('sequelize');

const PAYMENT_STATUSES = ['pending_review', 'verified', 'rejected'];
const INSTALLMENT_STATUSES = ['not_due', 'due', 'paid'];

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.ProgramApplication, {
        foreignKey: 'applicant_id',
        as: 'applicant',
      });
      Payment.belongsTo(models.Track, {
        foreignKey: 'track_id',
        as: 'track',
      });
      Payment.hasMany(models.PaymentReviewLog, {
        foreignKey: 'payment_id',
        as: 'reviews',
      });
    }
  }

  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      applicant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      track_id: {
        // Nullable only for legacy (Paystack-era) payments that cannot be
        // mapped onto the new track records with confidence.
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        /** Naira, whole units. Authoritative server-side from the Track price. */
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      installment_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      installment_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'due',
        validate: { isIn: [INSTALLMENT_STATUSES] },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending_review',
        validate: { isIn: [PAYMENT_STATUSES] },
      },
      proof_file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reference_note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      non_refundable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      submitted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      reviewed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      reviewed_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rejection_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'payments',
      timestamps: true,
    }
  );

  return Payment;
};