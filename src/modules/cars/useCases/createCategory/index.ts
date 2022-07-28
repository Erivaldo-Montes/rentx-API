import { CategoriesRepository } from '../../repositories/implementations/categoriesRepository';
import { CreateCategoryController } from './createCategoryController';
import { CreatecategoryUseCase } from './createCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreatecategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);
export { createCategoryController };
