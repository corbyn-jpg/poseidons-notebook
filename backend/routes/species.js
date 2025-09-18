// routes/species.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all species
router.get('/', async (req, res) => {
  try {
    const [species] = await db.execute('SELECT * FROM species ORDER BY common_name');
    res.json(species);
  } catch (error) {
    console.error('Error fetching species:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single species by ID
router.get('/:id', async (req, res) => {
  try {
    const [species] = await db.execute(
      'SELECT * FROM species WHERE species_id = ?',
      [req.params.id]
    );
    
    if (species.length === 0) {
      return res.status(404).json({ error: 'Species not found' });
    }
    
    res.json(species[0]);
  } catch (error) {
    console.error('Error fetching species:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;