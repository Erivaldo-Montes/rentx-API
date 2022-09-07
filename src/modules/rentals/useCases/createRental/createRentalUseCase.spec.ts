import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/carsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/rentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/dayjsDateProvider";
import { AppError } from "@shared/errors/appError";

import { CreateRentalUseCase } from "./createRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create rental", () => {
  const day24AddHours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it("Should be able to create a new rental to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "car1 description",
      brand: "brand",
      daily_rate: 90,
      fine_amount: 100,
      license_plate: "TGD-1311",
      category_id: "1234",
    });

    console.log(dayjs());
    console.log(day24AddHours);
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1",
      expected_return_date: day24AddHours,
    });

    console.log(rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if another is open to same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1332",
      user_id: "5",
      expected_return_date: day24AddHours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "1332",
        user_id: "6",
        expected_return_date: day24AddHours,
      }),
    ).rejects.toEqual(new AppError("car is unavailable"));
  });

  it("Should not be able to create a new rental if another is open to same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "2",
      user_id: "4",
      expected_return_date: day24AddHours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "3",
        user_id: "4",
        expected_return_date: day24AddHours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("Should not be able to create a new renta with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "3",
        user_id: "4",
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
