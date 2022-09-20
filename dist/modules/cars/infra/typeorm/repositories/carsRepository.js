"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

var _car = require("../entities/car");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.default.getRepository(_car.Car);
  }

  async create({
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
    brand,
    id,
    specifications
  }) {
    const car = this.repository.create({
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      brand,
      id,
      specifications
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      where: {
        license_plate
      }
    });
    return car;
  }

  async findAvailable(name, category_id, brand) {
    const carQuery = await this.repository.createQueryBuilder("car").where("car.available = :available", {
      available: true
    });

    if (brand) {
      carQuery.andWhere("car.brand = :brand", {
        brand
      });
    }

    if (name) {
      carQuery.andWhere("car.name = :name", {
        name
      });
    }

    if (category_id) {
      carQuery.andWhere("car.category_id = :category_id", {
        category_id
      });
    }

    const cars = await carQuery.getMany();
    return cars;
  }

  async findById(id) {
    const car = await this.repository.findOne({
      where: {
        id
      }
    });
    return car;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;