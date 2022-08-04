import { CategoriesRepository } from '../../repositories/implementations/categoriesRepository';
import { ImportCategoriesController } from './importCategoriesController';
import { ImportCategoriesUseCase } from './importCategoriesUseCase';

export default (): ImportCategoriesController => {
  const categoriesRepository = new CategoriesRepository();

  const importCategoriesUseCase = new ImportCategoriesUseCase(
    categoriesRepository,
  );

  const importCategoriesController = new ImportCategoriesController(
    importCategoriesUseCase,
  );

  return importCategoriesController;
};
