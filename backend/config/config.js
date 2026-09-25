require('dotenv').config();

const databaseSsl = {
  require: true,
  rejectUnauthorized: true,
};

if (process.env.DATABASE_CA_CERT) {
  databaseSsl.ca = process.env.DATABASE_CA_CERT.replace(/\\n/g, '\n');
}

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'root',
    password: process.env.DEV_DB_PASSWORD || null,
    database: process.env.DEV_DB_NAME || 'blockfuse_dev',
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: databaseSsl,
    },
    logging: false,
  },
};
