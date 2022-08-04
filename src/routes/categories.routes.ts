import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import importCategoriesController from '../modules/cars/useCases/importCategories/index';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const upload = multer({ dest: './tmp' });

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController().handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoriesController().handle(request, response);
});
export { categoriesRoutes };
