# MySQL Connection Troubleshooting Guide

## Issue: Handshake inactivity timeout

This error occurs when the application cannot connect to the MySQL database server.

## Solutions:

### 1. Start MySQL Service

**Option A: Using Services (GUI)**
1. Press `Win + R`, type `services.msc`, press Enter
2. Find "MYSQL80" service
3. Right-click and select "Start"

**Option B: Using Command Line**
```powershell
# Try these commands:
Start-Service MYSQL80
# or
net start MYSQL80
```

### 2. Check MySQL Installation

If MySQL service won't start, you may need to:
1. Reinstall MySQL Server
2. Check MySQL error logs in `C:\ProgramData\MySQL\MySQL Server 8.0\Data\`
3. Ensure MySQL is properly configured

### 3. Alternative: Use SQLite for Development

If MySQL continues to have issues, you can switch to SQLite for development:

1. Install SQLite dependencies:
```bash
npm install sqlite3
```

2. Update `src/db/data-source.ts`:
```typescript
export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['dist/db/entities/**/*{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  seeds: ['dist/db/seeds/**/*{.ts,.js}'],
  synchronize: true,
  logger: 'debug',
};
```

### 4. Environment Variables

Make sure your `.env` file has the correct database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password_here
DB_DATABASE=academy_soft
```

### 5. Create Database

If the database doesn't exist:
1. Connect to MySQL: `mysql -u root -p`
2. Create database: `CREATE DATABASE academy_soft;`

### 6. Test Connection

Run the test script:
```bash
node test-db.js
```

## Common Issues:

1. **MySQL not installed**: Download and install MySQL Server
2. **Wrong credentials**: Check username/password in .env file
3. **Database doesn't exist**: Create the database manually
4. **Port conflicts**: Check if port 3306 is available
5. **Firewall blocking**: Allow MySQL through Windows Firewall

## Quick Fix for Development:

If you want to get started quickly, consider using SQLite instead of MySQL for development. 