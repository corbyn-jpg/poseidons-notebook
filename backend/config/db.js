const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // Only use environment variable
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false // Disable SQL query logs in console
  }
);

module.exports = sequelize;