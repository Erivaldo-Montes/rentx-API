"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnection = createConnection;
exports.default = void 0;

var _typeorm = require("typeorm");

var _user = require("@modules/accounts/infra/typorm/entities/user");

var _userToken = require("@modules/accounts/infra/typorm/entities/userToken");

var _car = require("@modules/cars/infra/typeorm/entities/car");

var _carImage = require("@modules/cars/infra/typeorm/entities/carImage");

var _category = require("@modules/cars/infra/typeorm/entities/category");

var _specification = require("@modules/cars/infra/typeorm/entities/specification");

var _rental = require("@modules/rentals/infra/typeorm/entities/rental");

const appDataSource = new _typeorm.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: [_user.User, _specification.Specification, _car.Car, _category.Category, _carImage.CarImage, _rental.Rental, _userToken.UserToken]
});

function createConnection(host = "database") {
  return appDataSource.setOptions({
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    // NODE_ENV é definido no packege.json
    database: process.env.NODE_ENV === "test" ? "rentx_test" : "postgres"
  }).initialize();
}

var _default = appDataSource;
exports.default = _default;