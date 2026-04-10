const path = require('path');
const fs = require('fs');

// Add api/node_modules to module search paths
const apiPath = path.join(__dirname, '..', 'api');
const nodeModulesPath = path.join(apiPath, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    module.paths.push(nodeModulesPath);
}

const mongoose = require('mongoose');

// Try to load dotenv from api/node_modules
const envFile = path.join(apiPath, '.env');

try {
    require('dotenv').config({ path: envFile });
} catch (e) {
    console.warn('Warning: Could not load "dotenv" module. Environment variables from .env might not be available.');
}

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/recipes';

console.log(`Connecting to MongoDB at: ${MONGO_URL}...`);

mongoose.connect(MONGO_URL)
    .then(async () => {
        console.log('Successfully connected to database.');
        console.log('Dropping database...');
        
        try {
            await mongoose.connection.dropDatabase();
            console.log('Database dropped successfully!');
        } catch (err) {
            console.error('Error dropping database:', err.message);
        } finally {
            await mongoose.connection.close();
            console.log('Disconnected from database.');
        }
    })
    .catch((err) => {
        console.error('Could not connect to database:', err.message);
        process.exit(1);
    });
