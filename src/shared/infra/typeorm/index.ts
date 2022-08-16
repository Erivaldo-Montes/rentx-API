import { DataSource } from "typeorm";

const appDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return appDataSource.setOptions({ host }).initialize();
}

export default appDataSource;
