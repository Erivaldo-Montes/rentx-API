"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _carsRepositoryInMemory = require("@modules/cars/repositories/in-memory/carsRepositoryInMemory");

var _rentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/rentalsRepositoryInMemory");

var _dayjsDateProvider = require("@shared/container/providers/dateProvider/implementations/dayjsDateProvider");

var _appError = require("@shared/errors/appError");

var _createRentalUseCase = require("./createRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayjsDateProvider;
let carsRepositoryInMemory;
describe("Create rental", () => {
  const day24AddHours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _rentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayjsDateProvider = new _dayjsDateProvider.DayjsDateProvider();
    carsRepositoryInMemory = new _carsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _createRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("Should be able to create a new rental to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "car1 description",
      brand: "brand",
      daily_rate: 90,
      fine_amount: 100,
      license_plate: "TGD-1311",
      category_id: "1234"
    });
    console.log((0, _dayjs.default)());
    console.log(day24AddHours);
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1",
      expected_return_date: day24AddHours
    });
    console.log(rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("Should not be able to create a new rental if another is open to same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1332",
      user_id: "5",
      expected_return_date: day24AddHours
    });
    await expect(createRentalUseCase.execute({
      car_id: "1332",
      user_id: "6",
      expected_return_date: day24AddHours
    })).rejects.toEqual(new _appError.AppError("car is unavailable"));
  });
  it("Should not be able to create a new rental if another is open to same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "2",
      user_id: "4",
      expected_return_date: day24AddHours
    });
    await expect(createRentalUseCase.execute({
      car_id: "3",
      user_id: "4",
      expected_return_date: day24AddHours
    })).rejects.toEqual(new _appError.AppError("There's a rental in progress for user"));
  });
  it("Should not be able to create a new renta with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      car_id: "3",
      user_id: "4",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _appError.AppError("Invalid return time"));
  });
});