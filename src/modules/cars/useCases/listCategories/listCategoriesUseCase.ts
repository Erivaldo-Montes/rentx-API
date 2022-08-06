import { inject, injectable } from 'tsyringe';

import { Category } from '../../entities/category';
import { CategoriesRepository } from '../../repositories/implementations/categoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private CategoriesRepository: CategoriesRepository,
  ) {}
  async execute(): Promise<Category[]> {
    const allCategories = await this.CategoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoriesUseCase };
