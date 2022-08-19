import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/createCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/importCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/listCategoriesController";

import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAutheticate } from "../middleware/ensureAuthenticate";

const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  ensureAutheticate,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  ensureAutheticate,
  ensureAdmin,
  upload.single("file"),
  importCategoriesController.handle,
);
export { categoriesRoutes };
