import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/createCarSpecificationsController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";

import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAutheticate } from "../middleware/ensureAuthenticate";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carRoutes.post("/", ensureAutheticate, ensureAdmin, createCarController.handle);

carRoutes.get("/available", listAvailableCarsController.handle);

carRoutes.post(
  "/specifications/:id",
  ensureAutheticate,
  ensureAdmin,
  createCarSpecificationController.handle,
);

export { carRoutes };
