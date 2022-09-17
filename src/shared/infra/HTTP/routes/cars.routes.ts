import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/createCarSpecificationsController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/uploadCarImagesController";

import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAutheticate } from "../middleware/ensureAuthenticate";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carRoutes.post("/", ensureAutheticate, ensureAdmin, createCarController.handle);

carRoutes.get("/available", listAvailableCarsController.handle);

carRoutes.post(
  "/specifications/:id",
  ensureAutheticate,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carRoutes.post(
  "/images/:id",
  ensureAutheticate,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle,
);

export { carRoutes };
