const express = require('express');
const router = express.Router();
const Species = require('../models/Species'); // Import the Sequelize model

// Get all species
router.get('/', async (req, res) => {
  try {
    const species = await Species.findAll({
      order: [['common_name', 'ASC']]
    });
    res.json(species);
  } catch (error) {
    console.error('Error fetching species:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single species by ID
router.get('/:id', async (req, res) => {
  try {
    const species = await Species.findByPk(req.params.id);
    
    if (!species) {
      return res.status(404).json({ error: 'Species not found' });
    }
    
    res.json(species);
  } catch (error) {
    console.error('Error fetching species:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;