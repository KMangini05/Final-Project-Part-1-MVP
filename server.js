require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/users');
const exerciseRoutes = require('./routes/exercises');
const logRoutes = require('./routes/logs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/logs', logRoutes);

// Test Route
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the Exercise Tracker API',
        routes: {
            users: '/api/users',
            exercises: '/api/exercises',
            logs: '/api/logs'
        }
    });
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use(errorHandler);

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;