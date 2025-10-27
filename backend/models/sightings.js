// models/sighting.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Species = require('./species'); // Import Species model
const User = require('./user'); // Import User model to associate sightings with a user

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
// Associate a sighting with a user (who reported it)
Sighting.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Sighting;