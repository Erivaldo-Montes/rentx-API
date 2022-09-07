import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/carsRepositoryInMemory";
import { AppError } from "@shared/errors/appError";

import { CreateCarUseCase } from "./createCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "car name",
      description: "description",
      daily_rate: 300,
      fine_amount: 200,
      brand: "tesla",
      license_plate: "ASD-1232",
      category_id: "cateogory",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "car1",
      description: "description",
      daily_rate: 300,
      fine_amount: 200,
      brand: "tesla",
      license_plate: "ASD-1232",
      category_id: "cateogory",
    });
    await expect(
      createCarUseCase.execute({
        name: "car2",
        description: "description",
        daily_rate: 300,
        fine_amount: 200,
        brand: "tesla",
        license_plate: "ASD-1232",
        category_id: "cateogory",
      }),
    ).rejects.toEqual(new AppError("car alreay exist"));
  });

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "car availabel",
      description: "description",
      daily_rate: 300,
      fine_amount: 200,
      brand: "tesla",
      license_plate: "ASF-1232",
      category_id: "cateogory",
    });
    console.log(car);

    expect(car.available).toBe(true);
  });
});
