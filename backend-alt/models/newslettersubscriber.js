'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NewsletterSubscriber extends Model {
    static associate(models) {}
  }

  NewsletterSubscriber.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      topics: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'NewsletterSubscriber',
      tableName: 'newsletter_subscribers',
      timestamps: true,
    }
  );

  return NewsletterSubscriber;
};
