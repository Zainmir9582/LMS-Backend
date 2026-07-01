import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';

dotenv.config();

// Debug: Log environment variables
console.log('Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '[SET]' : '[NOT SET]');
console.log('DB_DATABASE:', process.env.DB_DATABASE);

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'academy_soft',
  entities: ['dist/db/entities/**/*.js'],
  migrations: ['dist/db/migrations/*.js'],
  seeds: ['dist/db/seeds/**/*.js'],
  synchronize: false, // Disable synchronize for production, use migrations
  logger: 'debug',
  // Add connection timeout and pool settings
  connectTimeout: 60000, // 60 seconds
  acquireTimeout: 60000, // 60 seconds
  extra: {
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    charset: 'utf8mb4',
  },
  // Connection pool settings
  poolSize: 10,
  maxQueryExecutionTime: 30000, // 30 seconds
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
