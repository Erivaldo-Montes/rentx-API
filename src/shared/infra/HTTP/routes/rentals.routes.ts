import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";

import { ensureAutheticate } from "../middleware/ensureAuthenticate";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post("/", ensureAutheticate, createRentalController.handle);

export { rentalsRoutes };
