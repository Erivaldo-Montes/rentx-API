import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/DTOs/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import appDataSource from "@shared/infra/typeorm";

import { Car } from "../entities/car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = appDataSource.getRepository(Car);
  }

  async create({
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      brand,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return car;
  }
}

export { CarsRepository };
