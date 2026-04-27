const { Sequelize } = require('sequelize');

// Create Sequelize (SQLite database)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    logging: false
});

// Import Models
const User = require('./models/user')(sequelize);
const Exercise = require('./models/exercise')(sequelize);
const Log = require('./models/log')(sequelize);

// Relationships
// User -> Logs
User.hasMany(Log, { foreignKey: 'userId' });
Log.belongsTo(User, { foreignKey: 'userId' });

// Exercise -> Logs
Exercise.hasMany(Log, { foreignKey: 'exerciseId' });
Log.belongsTo(Exercise, { foreignKey: 'exerciseId' });

// Export
module.exports = {
    sequelize,
    User,
    Exercise,
    Log
}

sequelize.sync({ force: false });