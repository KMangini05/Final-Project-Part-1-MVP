const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../database/setup');


// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email']
        });

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
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] } // 🔥 FIX
        });

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


// CREATE user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const user = await User.create({
            name,
            email,
            password: 'default123'
        });

        res.status(201).json(user);

    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({
            error: 'Failed to create user',
            details: err.message
        });
    }
});


// LOGIN user (JWT)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({
                error: 'Invalid password'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token
        });

    } catch (err) {
        res.status(500).json({
            error: 'Login failed',
            details: err.message
        });
    }
});


// UPDATE user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        await user.update(req.body);

        res.json({
            message: 'User updated successfully'
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