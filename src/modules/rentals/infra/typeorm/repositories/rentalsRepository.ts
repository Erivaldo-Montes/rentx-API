import { Repository, IsNull } from "typeorm";

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
    const openByCar = await this.repository.findOne({
      where: {
        end_date: IsNull(),
        car_id,
      },
    });
    console.log(openByCar);

    return openByCar;
  }

  async findRentalOpenByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    });
    return openByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { id } });
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
    return rentals;
  }
}

export { RentalsRepository };
