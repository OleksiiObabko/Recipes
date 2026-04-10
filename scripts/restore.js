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

const args = process.argv.slice(2);
const backupFolderArg = args[0];

if (!backupFolderArg) {
    console.error('Usage: npm run restore -- <backup-folder-name>');
    console.log('Available backups:');
    if (fs.existsSync(BACKUP_PATH)) {
        fs.readdirSync(BACKUP_PATH).forEach(file => {
            if (fs.statSync(path.join(BACKUP_PATH, file)).isDirectory()) {
                console.log(` - ${file}`);
            }
        });
    }
    process.exit(1);
}

const backupToRestore = path.join(BACKUP_PATH, backupFolderArg);

if (!fs.existsSync(backupToRestore)) {
    console.error(`Error: Backup folder "${backupToRestore}" does not exist.`);
    process.exit(1);
}

// Find the database folder inside the backup folder (mongodump --out puts it in subfolder)
const dbFolders = fs.readdirSync(backupToRestore).filter(file => {
    return fs.statSync(path.join(backupToRestore, file)).isDirectory();
});

if (dbFolders.length === 0) {
    console.error('No database dumps found in the backup folder.');
    process.exit(1);
}

// Use the first DB folder found
const dbName = dbFolders[0];
const dbDumpPath = path.join(backupToRestore, dbName);

console.log(`Starting restore of database "${dbName}" from ${backupFolderArg}...`);

const command = `mongorestore --uri="${MONGO_URL}" --nsInclude="${dbName}.*" "${dbDumpPath}" --drop`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error during restore: ${error.message}`);
        console.error('Make sure MongoDB Database Tools (mongorestore) are installed and added to PATH.');
        return;
    }
    if (stderr) {
        console.log(`Restore process info:\n${stderr}`);
    }
    console.log('Database successfully restored!');
});
