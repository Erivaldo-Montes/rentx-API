import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";

import { ensureAutheticate } from "../middleware/ensureAuthenticate";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAutheticate);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
