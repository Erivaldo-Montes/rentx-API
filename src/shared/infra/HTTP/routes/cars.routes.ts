import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";

import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAutheticate } from "../middleware/ensureAuthenticate";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carRoutes.post("/", ensureAutheticate, ensureAdmin, createCarController.handle);

carRoutes.get("/available", listAvailableCarsController.handle);

export { carRoutes };
