import { Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/DTOs/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import appDataSource from "@shared/infra/typeorm";

import { Rental } from "../entities/rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = appDataSource.getRepository(Rental);
  }

  async findRentalOpenByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ where: { car_id } });
    return openByCar;
  }

  async findRentalOpenByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({ where: { user_id } });
    return openByUser;
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);
    return rental;
  }
}

export { RentalsRepository };
