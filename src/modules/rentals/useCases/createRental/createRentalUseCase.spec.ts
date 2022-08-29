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
    const rental = await createRentalUseCase.execute({
      car_id: "1",
      user_id: "1",
      expected_return_date: day24AddHours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if another is open to same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "2",
        user_id: "2",
        expected_return_date: day24AddHours,
      });

      await createRentalUseCase.execute({
        car_id: "2",
        user_id: "3",
        expected_return_date: day24AddHours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if another is open to same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "3",
        user_id: "4",
        expected_return_date: day24AddHours,
      });

      await createRentalUseCase.execute({
        car_id: "4",
        user_id: "4",
        expected_return_date: day24AddHours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new renta with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "3",
        user_id: "4",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
