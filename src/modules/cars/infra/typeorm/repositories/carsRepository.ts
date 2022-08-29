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
    id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      brand,
      id,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return car;
  }

  async findAvailable(
    name?: string,
    category_id?: string,
    brand?: string,
  ): Promise<Car[]> {
    const carQuery = await this.repository
      .createQueryBuilder("car")
      .where("car.available = :available", { available: true });

    if (brand) {
      carQuery.andWhere("car.brand = :brand", { brand });
    }

    if (name) {
      carQuery.andWhere("car.name = :name", { name });
    }

    if (category_id) {
      carQuery.andWhere("car.category_id = :category_id", { category_id });
    }

    const cars = await carQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { id } });
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
