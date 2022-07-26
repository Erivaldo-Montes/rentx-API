import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/categoriesRepository';
import { CreatecategoryService } from '../modules/cars/services/createCategoryService';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreatecategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list();

  return response.json({ categories });
});

export { categoriesRoutes };
