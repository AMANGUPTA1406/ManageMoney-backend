const { Sequelize } = require('sequelize');

// Create Sequelize instance with MySQL connection
const sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT || 3306,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        },
        logging: false, // Set to console.log to see SQL queries
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Test database connection
const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Sequelize: Database connected successfully');
        return true;
    } catch (error) {
        console.error('❌ Sequelize: Database connection failed:', error.message);
        throw error;
    }
};

// Sync all models with database
const syncDatabase = async (options = {}) => {
    try {
        await sequelize.sync(options);
        console.log('✅ Sequelize: Models synchronized with database');
        return true;
    } catch (error) {
        console.error('❌ Sequelize: Model sync failed:', error.message);
        throw error;
    }
};

module.exports = { sequelize, connectDatabase, syncDatabase };
