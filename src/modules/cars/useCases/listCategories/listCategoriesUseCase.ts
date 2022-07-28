import { Category } from '../../model/category';
import { CategoriesRepository } from '../../repositories/implementations/categoriesRepository';

class ListCategoriesUseCase {
  constructor(private CategoriesRepository: CategoriesRepository) {}
  execute(): Category[] {
    const allCategories = this.CategoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoriesUseCase };
