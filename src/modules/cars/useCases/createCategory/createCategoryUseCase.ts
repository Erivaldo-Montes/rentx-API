import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreatecategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryExist = this.categoriesRepository.findByName(name);

    if (categoryExist) {
      throw new Error('category alredy exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreatecategoryUseCase };
