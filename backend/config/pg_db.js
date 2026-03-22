const { Sequelize } = require('sequelize');

// Initialize Sequelize connection
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres',
    logging: false, // Set to true to log SQL queries
});

const connectPG = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected via Sequelize');
        // await sequelize.sync({ alter: true }); // Automatically map models to database
    } catch (error) {
        console.error(`Error connecting to PostgreSQL: ${error.message}`);
        // Continuing execution anyway so existing MongoDB logic doesn't crash
    }
};

module.exports = { sequelize, connectPG };
