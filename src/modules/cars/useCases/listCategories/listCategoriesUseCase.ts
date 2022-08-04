import { Category } from '../../entities/category';
import { CategoriesRepository } from '../../repositories/implementations/categoriesRepository';

class ListCategoriesUseCase {
  constructor(private CategoriesRepository: CategoriesRepository) {}
  async execute(): Promise<Category[]> {
    const allCategories = await this.CategoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoriesUseCase };
