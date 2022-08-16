import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/createCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/importCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/listCategoriesController";

const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle,
);
export { categoriesRoutes };
