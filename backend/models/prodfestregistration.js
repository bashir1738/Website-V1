'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProdfestRegistration extends Model {
    static associate(models) {}
  }

  ProdfestRegistration.init(
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
      attending_as: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organisation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      goals: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'ProdfestRegistration',
      tableName: 'prodfest_registrations',
      timestamps: true,
    }
  );

  return ProdfestRegistration;
};
