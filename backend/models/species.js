const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Species = sequelize.define('Species', {
  species_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  common_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  scientific_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  conservation_status: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  avg_depth_range: {
    type: DataTypes.STRING(100)
  },
  habitat: {
    type: DataTypes.STRING(255)
  },
  image_url: {
    type: DataTypes.STRING(500)
  },
  description: {
    type: DataTypes.TEXT
  },
  size_range: {
    type: DataTypes.STRING(100)
  },
  diet: {
    type: DataTypes.STRING(100)
  },
  geographic_range: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'species',
  timestamps: false
});

module.exports = Species;