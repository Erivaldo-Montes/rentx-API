import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}
class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationRepository: ISpecificationsRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new AppError("car does not exist");
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id,
    );

    carExist.specifications = specifications;

    await this.carsRepository.create(carExist);

    console.log(carExist);
  }
}

export { CreateCarSpecificationUseCase };
