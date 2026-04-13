const { DataTypes } = require('sequelize');
const { sequelize } = require('../setup');

module.exports = (sequelize) => {
    return sequelize.define('Exercise', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    });
};