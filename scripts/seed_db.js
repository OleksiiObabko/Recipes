const path = require('path');
const fs = require('fs');

// Add api/node_modules to module search paths
const apiPath = path.join(__dirname, '..', 'api');
const nodeModulesPath = path.join(apiPath, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    module.paths.push(nodeModulesPath);
}

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Try to load dotenv from api/node_modules
const envFile = path.join(apiPath, '.env');

try {
    require('dotenv').config({ path: envFile });
} catch (e) {
    console.warn('Warning: Could not load "dotenv" module.');
}

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/recipes';

// Import models
const Role = require('../api/dataBases/Role');
const Author = require('../api/dataBases/Author');

const roles = [
    { title: 'user' },
    { title: 'admin' }
];

async function seed() {
    try {
        console.log(`Connecting to MongoDB at: ${MONGO_URL}...`);
        await mongoose.connect(MONGO_URL);
        console.log('Connected to database.');

        // 1. Seed Roles
        console.log('Seeding roles...');
        for (const role of roles) {
            await Role.findOneAndUpdate({ title: role.title }, role, { upsert: true, new: true });
        }
        const adminRole = await Role.findOne({ title: 'admin' });

        // 2. Seed Admin User
        console.log('Seeding admin user...');
        const adminEmail = 'admin@recipes.com';
        let admin = await Author.findOne({ email: adminEmail });
        if (!admin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            admin = await Author.create({
                userName: 'Admin',
                email: adminEmail,
                password: hashedPassword,
                role: adminRole._id
            });
            console.log('Admin user created (admin@recipes.com / admin123)');
        } else {
            console.log('Admin user already exists.');
        }

        // 3. Cleanup: Seeding completed successfully!
        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Disconnected from database.');
    }
}

seed();
