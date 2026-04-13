const express = require('express');
const router = express.Router();
const { User } = require('../database/setup');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch users',
            details: err.message
        });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({
            error: 'Database error while fetching user',
            details: err.message
        });
    }
});


// POST create user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required'
        });
    }

    const user = await User.create({ name, email });

    res.status(201).json(user);

  } catch (err) {
    res.status(400).json({
        error: 'Failed to create user',
        details: err.message
    });
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    await user.update(req.body);

    res.json({
        message: 'User updated successfully',
        user
    });

    } catch (err) {
        res.status(500).json({
            error: 'Failed to update user',
            details: err.message
        });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        await user.destroy();

        res.json({
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to delete user',
            details: err.message
        });
    }
});

module.exports = router;