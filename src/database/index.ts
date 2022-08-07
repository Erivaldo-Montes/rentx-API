import { DataSource } from "typeorm";

const appDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return appDataSource.setOptions({ host }).initialize();
}

export default appDataSource;
