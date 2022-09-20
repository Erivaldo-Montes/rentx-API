"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _typeorm2 = _interopRequireDefault(require("@shared/infra/typeorm"));

var _rental = require("../entities/rental");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm2.default.getRepository(_rental.Rental);
  }

  async findRentalOpenByCar(car_id) {
    const openByCar = await this.repository.findOne({
      where: {
        end_date: (0, _typeorm.IsNull)(),
        car_id
      }
    });
    console.log(openByCar);
    return openByCar;
  }

  async findRentalOpenByUser(user_id) {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: (0, _typeorm.IsNull)()
      }
    });
    return openByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total
  }) {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }

  async findById(id) {
    const rental = await this.repository.findOne({
      where: {
        id
      }
    });
    return rental;
  }

  async findByUser(user_id) {
    const rentals = await this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
    return rentals;
  }

}

exports.RentalsRepository = RentalsRepository;