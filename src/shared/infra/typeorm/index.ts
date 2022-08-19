import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typorm/entities/user";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { Specification } from "@modules/cars/infra/typeorm/entities/specification";

const appDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: [User, Specification, Car, Category],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return appDataSource.setOptions({ host }).initialize();
}
createConnection();

export default appDataSource;
