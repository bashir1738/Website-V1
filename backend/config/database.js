const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

let sequelize;

if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DEV_DB_NAME || 'blockfuse_dev',
    process.env.DEV_DB_USERNAME || 'root',
    process.env.DEV_DB_PASSWORD || null,
    {
      host: process.env.DEV_DB_HOST || '127.0.0.1',
      dialect: 'mysql',
      logging: false,
    }
  );
}

module.exports = sequelize;
