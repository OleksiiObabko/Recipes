const path = require('path');
const fs = require('fs');

// Add api/node_modules to module search paths
const apiPath = path.join(__dirname, '..', 'api');
const nodeModulesPath = path.join(apiPath, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    module.paths.push(nodeModulesPath);
}

const { exec } = require('child_process');

// Try to load dotenv from api/node_modules
const envFile = path.join(apiPath, '.env');

try {
    require('dotenv').config({ path: envFile });
} catch (e) {
    console.warn('Warning: Could not load "dotenv" module. Environment variables from .env might not be available.');
}

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/recipes';
const BACKUP_PATH = path.join(__dirname, '..', 'mongo_db', 'backups');

if (!fs.existsSync(BACKUP_PATH)) {
    fs.mkdirSync(BACKUP_PATH, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupName = `backup-${timestamp}`;
const backupFolder = path.join(BACKUP_PATH, backupName);

// Extract DB name from MONGO_URL if possible, or use a default
// Expected format: mongodb://host:port/dbname or mongodb+srv://.../dbname
let dbName = '';
try {
    const urlParts = MONGO_URL.split('/');
    dbName = urlParts[urlParts.length - 1].split('?')[0];
} catch (e) {
    dbName = 'recipes';
}

console.log(`Starting backup of database: ${dbName}...`);

const command = `mongodump --uri="${MONGO_URL}" --out="${backupFolder}"`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error during backup: ${error.message}`);
        console.error('Make sure MongoDB Database Tools (mongodump) are installed and added to PATH.');
        return;
    }
    if (stderr) {
        console.log(`Backup process info:\n${stderr}`);
    }
    console.log(`Backup successfully created at: ${backupFolder}`);
    console.log(`To restore this backup, run: npm run restore -- ${backupName}`);
});
