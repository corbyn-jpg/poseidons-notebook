const { Sequelize } = require('sequelize');
require('dotenv').config();

// Support multiple ways to configure a MySQL connection in production
// 1) Full URL provided by an add-on: JAWSDB_URL or DATABASE_URL
// 2) Individual env vars: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT

let sequelize;
if (process.env.JAWSDB_URL || process.env.DATABASE_URL) {
  const url = process.env.JAWSDB_URL || process.env.DATABASE_URL;
  // Sequelize can accept the full connection URI
  sequelize = new Sequelize(url, {
    dialect: 'mysql',
    logging: false
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      logging: false
    }
  );
}

module.exports = sequelize;