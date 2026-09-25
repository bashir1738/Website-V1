const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const databaseSsl = {
  require: true,
  rejectUnauthorized: true,
};

if (process.env.DATABASE_CA_CERT) {
  databaseSsl.ca = process.env.DATABASE_CA_CERT.replace(/\\n/g, '\n');
}

let sequelize;

if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: databaseSsl,
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
