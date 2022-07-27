import { CategoriesRepository } from '../../repositories/categoriesRepository';
import { CreateCategoryController } from './createCategoryController';
import { CreatecategoryUseCase } from './createCategoryUseCase';

const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreatecategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);
export { createCategoryController };
