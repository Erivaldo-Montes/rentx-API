import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../error/appError";
import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreatecategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExist = await this.categoriesRepository.findByName(name);

    if (categoryExist) {
      throw new AppError("category alredy exists");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreatecategoryUseCase };
