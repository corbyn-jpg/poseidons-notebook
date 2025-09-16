const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      // Hash password before saving
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hash);
    }
  }
});

module.exports = User;