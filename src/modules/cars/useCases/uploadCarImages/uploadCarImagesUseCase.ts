import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRespository")
    private carImageRepository: ICarImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async image => {
      await this.carImageRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
