import { ICreateRentalDTO } from "../DTOs/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/rental";

interface IRentalsRepository {
  findRentalOpenByCar(car_id: string): Promise<Rental>;
  findRentalOpenByUser(user_id: string): Promise<Rental>;
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
