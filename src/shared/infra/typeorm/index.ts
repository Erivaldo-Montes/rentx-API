import { DataSource, DataSourceOptions } from "typeorm";

import { User } from "@modules/accounts/infra/typorm/entities/user";
import { UserToken } from "@modules/accounts/infra/typorm/entities/userToken";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/carImage";
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { Specification } from "@modules/cars/infra/typeorm/entities/specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";

const appDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 3301,
  username: "postgres",
  password: "@Ro0/3pWdhjY",
  database: "postgres",
  migrations: ["./src/shared/infra/typeorm/migrations/*.js"],
  entities: [User, Specification, Car, Category, CarImage, Rental, UserToken],
});

export function createConnection(/* host = "database" */): Promise<DataSource> {
  return appDataSource
    .setOptions({
      // host: process.env.NODE_ENV === "test" ? "localhost" : host,

      // NODE_ENV é definido no packege.json
      database: process.env.NODE_ENV === "test" ? "rentx_test" : "postgres",
    })
    .initialize();
}

export default appDataSource;
