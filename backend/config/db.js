const { Sequelize } = require('sequelize');
require('dotenv').config();

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