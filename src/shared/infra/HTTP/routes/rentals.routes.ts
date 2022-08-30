import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/devolutionRentalController";

import { ensureAutheticate } from "../middleware/ensureAuthenticate";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post("/", ensureAutheticate, createRentalController.handle);
rentalsRoutes.post(
  "/devolution/:id",
  ensureAutheticate,
  devolutionRentalController.handle,
);

export { rentalsRoutes };
