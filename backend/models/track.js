'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate(models) {
      Track.hasMany(models.Payment, { foreignKey: 'track_id', as: 'payments' });
    }
  }

  Track.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      curriculum: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('curriculum');
          if (!raw) return null;
          try {
            return typeof raw === 'string' ? JSON.parse(raw) : raw;
          } catch {
            return null;
          }
        },
        set(value) {
          this.setDataValue('curriculum', JSON.stringify(value));
        },
      },
      total_installments: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'Track',
      tableName: 'tracks',
      timestamps: true,
    }
  );

  return Track;
};