'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OpenSourceApplication extends Model {
    static associate(models) {}
  }

  OpenSourceApplication.init(
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
      github: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      interests: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      hours: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      focus: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'OpenSourceApplication',
      tableName: 'opensource_applications',
      timestamps: true,
    }
  );

  return OpenSourceApplication;
};
