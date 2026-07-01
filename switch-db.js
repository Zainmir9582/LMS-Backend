const fs = require('fs');
const path = require('path');

const dbType = process.argv[2] || 'mysql';

if (dbType === 'sqlite') {
  console.log('🔄 Switching to SQLite configuration...');
  
  // Install sqlite3 if not already installed
  const { execSync } = require('child_process');
  try {
    execSync('npm install sqlite3', { stdio: 'inherit' });
    console.log('✅ SQLite dependencies installed');
  } catch (error) {
    console.log('⚠️  SQLite dependencies already installed or failed to install');
  }
  
  console.log('\n📋 To use SQLite:');
  console.log('1. Update your app.module.ts to use SQLite configuration');
  console.log('2. Import dataSourceOptionsSQLite from "./src/db/data-source-sqlite"');
  console.log('3. Run: npm run start:dev');
  
} else if (dbType === 'mysql') {
  console.log('🔄 Switching to MySQL configuration...');
  console.log('\n📋 To use MySQL:');
  console.log('1. Make sure MySQL service is running');
  console.log('2. Update your .env file with correct credentials');
  console.log('3. Create the database if it doesn\'t exist');
  console.log('4. Run: npm run start:dev');
  
} else {
  console.log('❌ Invalid database type. Use "mysql" or "sqlite"');
  console.log('Example: node switch-db.js sqlite');
}

console.log('\n📖 See TROUBLESHOOTING.md for detailed instructions'); 