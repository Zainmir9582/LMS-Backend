import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptionsSQLite: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['dist/db/entities/**/*.js'],
  migrations: ['dist/db/migrations/*.js'],
  seeds: ['dist/db/seeds/**/*.js'],
  synchronize: true,
  logger: 'debug',
};

const dataSourceSQLite = new DataSource(dataSourceOptionsSQLite);
export default dataSourceSQLite; 