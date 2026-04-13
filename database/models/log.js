const { DataTypes } = require('sequelize');
const { sequelize } = require('../setup');

module.exports = (sequelize) => {
    return sequelize.define('Log', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        repetitions: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT
        }
    });
};