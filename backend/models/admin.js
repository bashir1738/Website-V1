'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {}
  }

  Admin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins',
      hooks: {
        beforeCreate: async (admin) => {
          admin.password = await bcrypt.hash(admin.password, 12);
        },
        beforeUpdate: async (admin) => {
          if (admin.changed('password')) {
            admin.password = await bcrypt.hash(admin.password, 12);
          }
        },
      },
    }
  );

  Admin.prototype.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  return Admin;
};
