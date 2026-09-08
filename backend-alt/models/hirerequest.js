'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HireRequest extends Model {
    static associate(models) {}
  }

  HireRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company: {
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
      roles: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      engagement_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seniority: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      count: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timeline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'HireRequest',
      tableName: 'hire_requests',
      timestamps: true,
    }
  );

  return HireRequest;
};
