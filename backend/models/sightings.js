const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sighting = sequelize.define('Sighting', {
  sighting_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  species_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'species',
      key: 'species_id'
    }
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  sighting_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  depth: {
    type: DataTypes.DECIMAL(6, 2)
  },
  notes: {
    type: DataTypes.TEXT
  },
  image_url: {
    type: DataTypes.STRING(500)
  }
}, {
  tableName: 'sightings',
  timestamps: false
});

// Associations
const Species = require('./species');
Sighting.belongsTo(Species, { foreignKey: 'species_id' });

module.exports = Sighting;