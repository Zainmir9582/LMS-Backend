import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptionsSQLiteDev: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['src/db/entities/**/*.ts'],
  migrations: ['src/db/migrations/*.ts'],
  seeds: ['src/db/seeds/**/*.ts'],
  synchronize: true,
  logger: 'debug',
};

const dataSourceSQLiteDev = new DataSource(dataSourceOptionsSQLiteDev);
export default dataSourceSQLiteDev; 