"use strict";

var _carsRepositoryInMemory = require("@modules/cars/repositories/in-memory/carsRepositoryInMemory");

var _specificationsRepositoryInMemory = require("@modules/cars/repositories/in-memory/specificationsRepositoryInMemory");

var _appError = require("@shared/errors/appError");

var _createCarSpecificationUseCase = require("./createCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _carsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _specificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _createCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("Should be able add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "car1 description",
      brand: "brand",
      category_id: "category_id",
      daily_rate: 120,
      fine_amount: 100,
      license_plate: "GTX-1080"
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: "specification1",
      description: "description specification1"
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    console.log(specificationsCars);
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
  it("Should not be able add a new specification to no exist car", async () => {
    const car_id = "1123";
    const specifications_id = ["1241"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _appError.AppError("car does not exist"));
  });
});