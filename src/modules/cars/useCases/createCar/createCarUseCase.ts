import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  fine_amount: number;
  brand: string;
  license_plate: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    fine_amount,
    brand,
    license_plate,
    category_id,
  }: IRequest): Promise<Car> {
    const carAreadyExist = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (carAreadyExist) {
      throw new AppError("car alreay exist");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      fine_amount,
      brand,
      license_plate,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
