'use strict';
const { Model } = require('sequelize');

const REVIEW_ACTIONS = ['submitted', 'approved', 'rejected'];

module.exports = (sequelize, DataTypes) => {
  class PaymentReviewLog extends Model {
    static associate(models) {
      PaymentReviewLog.belongsTo(models.Payment, {
        foreignKey: 'payment_id',
        as: 'payment',
      });
    }
  }

  PaymentReviewLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isIn: [REVIEW_ACTIONS] },
      },
      actor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'PaymentReviewLog',
      tableName: 'payment_review_logs',
      timestamps: true,
    }
  );

  return PaymentReviewLog;
};