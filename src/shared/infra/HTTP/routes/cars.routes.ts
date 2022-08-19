import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";

import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAutheticate } from "../middleware/ensureAuthenticate";

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post("/", ensureAutheticate, ensureAdmin, createCarController.handle);

export { carRoutes };
