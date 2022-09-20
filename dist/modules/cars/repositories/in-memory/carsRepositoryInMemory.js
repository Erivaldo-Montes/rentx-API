"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _car = require("@modules/cars/infra/typeorm/entities/car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = new _car.Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
      category_id,
      specifications,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findAvailable(name, category_id, brand) {
    const cars = this.cars.filter(car => {
      if (car.available === true || brand && car.brand === brand || category_id && car.category_id === category_id || name && car.name === name) {
        return car;
      }

      return null;
    });
    return cars;
  }

  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailable(id, available) {
    const carIndex = this.cars.findIndex(car => car.id === id);
    this.cars[carIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;