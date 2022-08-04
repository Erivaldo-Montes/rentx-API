import { CategoriesRepository } from '../../repositories/implementations/categoriesRepository';
import { CreateCategoryController } from './createCategoryController';
import { CreatecategoryUseCase } from './createCategoryUseCase';

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreatecategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

  return createCategoryController;
};
