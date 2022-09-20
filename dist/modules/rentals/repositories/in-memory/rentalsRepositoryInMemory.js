"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepositoryInMemory = void 0;

var _rental = require("@modules/rentals/infra/typeorm/entities/rental");

class RentalsRepositoryInMemory {
  constructor() {
    this.rentals = [];
  }

  async findRentalOpenByCar(car_id) {
    const rentals = this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    return rentals;
  }

  async findRentalOpenByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

  async create({
    car_id,
    user_id,
    expected_return_date
  }) {
    const rental = new _rental.Rental();
    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findById(id) {
    return this.rentals.find(rental => rental.id === id);
  }

  async findByUser(user_id) {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }

}

exports.RentalsRepositoryInMemory = RentalsRepositoryInMemory;