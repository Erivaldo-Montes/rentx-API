import { DataSource, DataSourceOptions } from "typeorm";

import { User } from "@modules/accounts/infra/typorm/entities/user";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/carImage";
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { Specification } from "@modules/cars/infra/typeorm/entities/specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";

const appDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: [User, Specification, Car, Category, CarImage, Rental],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return appDataSource
    .setOptions({
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      // NODE_ENV é definido no packege.json
      database: process.env.NODE_ENV === "test" ? "rentx_test" : "postgres",
    })
    .initialize();
}

export default appDataSource;
