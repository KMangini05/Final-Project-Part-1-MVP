const express = require('express');
const router = express.Router();
const { Log } = require('../database/setup');

// GET all logs
router.get('/', async (req, res) => {
    try {
        const logs = await Log.findAll();
        res.json(logs);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch logs',
            details: err.message
        });
    }
});

// GET log by ID
router.get('/:id', async (req, res) => {
    try {
        const log = await Log.findByPk(req.params.id);

        if (!log) {
            return res.status(404).json({
                error: 'Log not found'
            });
        }

        res.json(log);
    } catch (err) {
        res.status(500).json({
            error: 'Database error while fetching log',
            details: err.message
        });
    }
});

// CREATE log
router.post('/', async (req, res) => {
  try {
    const { userId, exerciseId, duration, date} = req.body;

    if (!userId || !exerciseId || !duration || !date) {
      return res.status(400).json({
        error: 'userId, exerciseId, duration, and date are required'
      });
    }

    const log = await Log.create(req.body);

    res.status(201).json(log);

  } catch (err) {
    res.status(500).json({
        error: 'Failed to create log',
        details: err.message
    });
  }
});

// UPDATE log
router.put('/:id', async (req, res) => {
    try {
        const log = await Log.findByPk(req.params.id);

        if (!log) {
            return res.status(404).json({
                error: 'Log not found'
            });
        }

        await log.update(req.body);

        res.json({
            message: 'Log updated successfully',
            log
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to update log',
            details: err.message
        });
    }
});

// DELETE log
router.delete('/:id', async (req, res) => {
    try {
        const log = await Log.findByPk(req.params.id);

        if (!log) {
            return res.status(404).json({
                error: 'Log not found'
            });
        }

        await log.destroy();
        
        res.json({ 
            message: 'Log deleted successfully'
        });
    
    } catch (err) {
        res.status(500).json({
            error: 'Failed to delete log',
            details: err.message
        });
    }
});

module.exports = router;