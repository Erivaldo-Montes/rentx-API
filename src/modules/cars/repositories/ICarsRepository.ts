import { ICreateCarDTO } from "../DTOs/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    name?: string,
    category_id?: string,
    brand?: string,
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
