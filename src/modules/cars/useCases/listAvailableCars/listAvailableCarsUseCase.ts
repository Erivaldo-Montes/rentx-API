import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}
  async execute({ category_id, name, brand }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      name,
      category_id,
      brand,
    );
    return cars;
  }
}

export { ListAvailableCarsUseCase };
