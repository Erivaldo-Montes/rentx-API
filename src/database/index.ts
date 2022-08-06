import { DataSource } from 'typeorm';

const appDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/modules/**/entities/*.ts'],
});

appDataSource.initialize();

export default appDataSource;
