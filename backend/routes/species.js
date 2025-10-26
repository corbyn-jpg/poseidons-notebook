const express = require('express');
const router = express.Router();
const Species = require('../models/species');
const { authenticateToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');

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

//
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const {
      common_name,
      scientific_name,
      category,
      conservation_status,
      avg_depth_range,
      habitat,
      image_url,
      description,
      size_range,
      diet,
      geographic_range
    } = req.body;

    // Validate required fields
    if (!common_name || !scientific_name || !category || !conservation_status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newSpecies = await Species.create({
      common_name,
      scientific_name,
      category,
      conservation_status,
      avg_depth_range: avg_depth_range || null,
      habitat: habitat || null,
      image_url: image_url || null,
      description: description || null,
      size_range: size_range || null,
      diet: diet || null,
      geographic_range: geographic_range || null
    });

    res.status(201).json(newSpecies);
  } catch (error) {
    console.error('Error creating species:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update species (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const species = await Species.findByPk(req.params.id);
    if (!species) return res.status(404).json({ error: 'Species not found' });

    await species.update(req.body);
    res.json(species);
  } catch (error) {
    console.error('Error updating species:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete species (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const species = await Species.findByPk(req.params.id);
    if (!species) return res.status(404).json({ error: 'Species not found' });

    await species.destroy();
    res.json({ message: 'Species deleted successfully' });
  } catch (error) {
    console.error('Error deleting species:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;