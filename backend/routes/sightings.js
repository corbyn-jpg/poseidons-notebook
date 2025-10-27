// routes/sightings.js
const express = require('express');
const router = express.Router();
const Sighting = require('../models/sightings');
const Species = require('../models/species');
const authenticateToken = require('../middleware/auth');
const { requireAdmin } = require('../middleware/auth');

// Admin-only: get all sightings across users
router.get('/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const sightings = await Sighting.findAll({
      include: [{
        model: Species,
        attributes: ['common_name', 'scientific_name', 'image_url']
      }],
      order: [['sighting_date', 'DESC']]
    });
    res.json(sightings);
  } catch (error) {
    console.error('Error fetching all sightings (admin):', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all sightings for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Always return sightings belonging to the requesting user
    const where = { user_id: req.user.id };
    const sightings = await Sighting.findAll({
      where,
      include: [{
        model: Species,
        attributes: ['common_name', 'scientific_name', 'image_url']
      }],
      order: [['sighting_date', 'DESC']]
    });
    res.json(sightings);
  } catch (error) {
    console.error('Error fetching sightings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single sighting by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const sighting = await Sighting.findOne({
      where: { sighting_id: req.params.id },
      include: [{
        model: Species,
        attributes: ['common_name', 'scientific_name', 'image_url', 'category']
      }]
    });
    
    if (!sighting) return res.status(404).json({ error: 'Sighting not found' });

    // Ensure the sighting belongs to the requesting user
    if (sighting.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to view this sighting' });
    }
    
    res.json(sighting);
  } catch (error) {
    console.error('Error fetching sighting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new sighting
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { species_id, sighting_date, location, depth_meters, notes } = req.body;
    
    // Validate required fields
    if (!species_id || !sighting_date || !location || depth_meters === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newSighting = await Sighting.create({
      user_id: req.user.id,
      species_id,
      sighting_date,
      location,
      depth_meters,
      notes: notes || ''
    });
    
    // Get the full sighting with species info
    const fullSighting = await Sighting.findOne({
      where: { sighting_id: newSighting.sighting_id },
      include: [{
        model: Species,
        attributes: ['common_name', 'scientific_name', 'image_url', 'category']
      }]
    });
    
    res.status(201).json(fullSighting);
  } catch (error) {
    console.error('Error creating sighting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a sighting
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { species_id, sighting_date, location, depth_meters, notes } = req.body;
    
    const sighting = await Sighting.findOne({ where: { sighting_id: req.params.id } });
    
    if (!sighting) {
      return res.status(404).json({ error: 'Sighting not found' });
    }

    if (sighting.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this sighting' });
    }
    
    await sighting.update({
      species_id: species_id || sighting.species_id,
      sighting_date: sighting_date || sighting.sighting_date,
      location: location || sighting.location,
      depth_meters: depth_meters || sighting.depth_meters,
      notes: notes || sighting.notes
    });
    // Return the full sighting including Species association so the client
    // can update its UI without re-fetching the list.
    const fullSighting = await Sighting.findOne({
      where: { sighting_id: sighting.sighting_id },
      include: [{
        model: Species,
        attributes: ['common_name', 'scientific_name', 'image_url', 'category']
      }]
    });

    res.json(fullSighting);
  } catch (error) {
    console.error('Error updating sighting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a sighting
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const sighting = await Sighting.findOne({ where: { sighting_id: req.params.id } });
    
    if (!sighting) {
      return res.status(404).json({ error: 'Sighting not found' });
    }
    if (sighting.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this sighting' });
    }

    await sighting.destroy();
    res.json({ message: 'Sighting deleted successfully' });
  } catch (error) {
    console.error('Error deleting sighting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;