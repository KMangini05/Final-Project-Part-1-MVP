const { sequelize } = require('./setup');

async function initDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced successfully!');
    } catch (error) {
        console.error('Errpr syncing database:', error);
    } finally {
        await sequelize.close();
    }
}

initDatabase();