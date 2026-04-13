const express = require('express');
const router = express.Router();
const { Exercise } = require('../database/setup');
const { defaultMaxListeners } = require('supertest/lib/test');

// GET all exercises
router.get('/', async (req, res) => {
    try {
        const data = await Exercise.findAll();
        res.json(data);
    } catch (err) {
        req.status(500).json({
            error: 'Failed to fetch exercises',
            details: err.message
        });
    }
});

// GET exercise by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Exercise.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({ 
                error: 'Exercise not found' 
            });
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({
            error: 'Database error while fetching exercise',
            details: err.message
        });
    }
});

// CREATE exercise
router.post('/', async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
        return res.status(400).json({
            error: 'Name and category are required'
        });
    }
    const item = await Exercise.create(req.body);

    res.status(201).json(item);

  } catch (err) {
    res.status(500).json({ 
        error: 'Failed to create exercise',
        details: err.message 
    });
  }
});

// UPDATE exercise
router.put('/:id', async (req, res) => {
    try {
        const item = await Exercise.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                error: 'Exercise not found'
            });
  }

  await item.update(req.body);

  res.json({
    message: 'Exercise updated successfully',
    exercise: item
  });
 } catch (err) {
    res.status(500).json({
        error: 'Failed to update exercise',
        details: err.message
    });
 }
});

// DELETE exercise
router.delete('/:id', async (req, res) => {
    try {
        const item = await Exercise.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                error: 'Exercise not found'
            });
        }

        await item.destroy();
        req.json({
            message: 'Exercise deleted successfully'
        });

    } catch (err) {
        res.status(500).json({
            error: 'Failed to delete exercise',
            details: err.message
        });
    }
});

module.exports = router;