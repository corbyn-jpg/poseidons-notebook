// models/sighting.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Species = require('./Species'); // Import Species model

const Sighting = sequelize.define('Sighting', {
  sighting_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  species_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Species,
      key: 'species_id'
    }
  },
  sighting_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  depth_meters: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'sightings',
  timestamps: false
});

// Define association
Sighting.belongsTo(Species, { foreignKey: 'species_id' });

module.exports = Sighting;