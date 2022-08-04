import 'reflect-metadata';
import { DataSource } from 'typeorm';

const appDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  migrations: ['./src/database/migrations/*.ts'],
});

appDataSource.initialize();

export default appDataSource;