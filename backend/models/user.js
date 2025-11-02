const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 30],
        msg: "Username must be between 3 and 30 characters"
      },
      is: {
        args: /^[a-zA-Z0-9_-]+$/,
        msg: "Username can only contain letters, numbers, hyphens, and underscores"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { 
      isEmail: {
        msg: "Please provide a valid email address"
      },
      len: {
        args: [5, 255],
        msg: "Email must be between 5 and 255 characters"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 255],
        msg: "Password must be at least 8 characters long"
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: { 
      isIn: {
        args: [['user', 'admin']],
        msg: "Role must be either 'user' or 'admin'"
      }
    }
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      user.email = user.email.toLowerCase();
    },
    beforeUpdate: (user) => {
      if (user.email) {
        user.email = user.email.toLowerCase();
      }
    }
  }
});

module.exports = User;