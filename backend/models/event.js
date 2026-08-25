'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {}
  }

  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Event',
      tableName: 'events',
      timestamps: true,
    }
  );

  return Event;
};
