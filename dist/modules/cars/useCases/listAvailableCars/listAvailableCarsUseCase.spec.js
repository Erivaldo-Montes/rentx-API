"use strict";

var _carsRepositoryInMemory = require("@modules/cars/repositories/in-memory/carsRepositoryInMemory");

var _listAvailableCarsUseCase = require("./listAvailableCarsUseCase");

let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("list cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _carsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _listAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("Should be able list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "car1 description",
      daily_rate: 120,
      fine_amount: 100,
      brand: "brand1",
      license_plate: "ASF-123",
      category_id: "279dcdcf-8ab9-475f-b797-cc43eb352f34"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("Should be able list all available car by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car2",
      description: "car1 description",
      daily_rate: 120,
      fine_amount: 100,
      brand: "brand2",
      license_plate: "ASF-123",
      category_id: "279dcdcf-8ab9-475f-b797-cc43eb352f34"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "brand2"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able list all available car by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "car1 description",
      daily_rate: 120,
      fine_amount: 100,
      brand: "brand2",
      license_plate: "DSF-1423",
      category_id: "279dcdcf-8ab9-475f-b797-cc43eb352f34"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "car3"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able list all available car by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car4",
      description: "car1 description",
      daily_rate: 120,
      fine_amount: 100,
      brand: "brand2",
      license_plate: "AKF-123",
      category_id: "279dcdcf-8ab9-475f-b797-cc43eb352f34"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "279dcdcf-8ab9-475f-b797-cc43eb352f34"
    });
    expect(cars).toEqual([car]);
  });
});