"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");

var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");

var _IDateProvider = require("@shared/container/providers/dateProvider/IDateProvider");

var _appError = require("@shared/errors/appError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUseCase {
  constructor(rentalRepository, carsRepository, dayjsDateProvider) {
    this.rentalRepository = rentalRepository;
    this.carsRepository = carsRepository;
    this.dayjsDateProvider = dayjsDateProvider;
  }

  async execute({
    user_id,
    id
  }) {
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;

    if (!rental) {
      throw new _appError.AppError("rental does not exist");
    }

    const dateNow = this.dayjsDateProvider.dateNow();
    let daily = this.dayjsDateProvider.compareInDays(rental.start_date, this.dayjsDateProvider.dateNow());

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dayjsDateProvider.compareInDays(dateNow, rental.expected_return_date);
    let total = 0;

    if (delay < 0) {
      const calculate_amount = delay * car.fine_amount;
      total = calculate_amount;
    }

    total += daily * car.daily_rate;
    rental.end_date = this.dayjsDateProvider.dateNow();
    rental.total = total;
    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;