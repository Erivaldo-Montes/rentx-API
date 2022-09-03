import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/devolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController";

import { ensureAutheticate } from "../middleware/ensureAuthenticate";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAutheticate, createRentalController.handle);

rentalsRoutes.post(
  "/devolution/:id",
  ensureAutheticate,
  devolutionRentalController.handle,
);

rentalsRoutes.get(
  "/user",
  ensureAutheticate,
  listRentalsByUserController.handle,
);

export { rentalsRoutes };
