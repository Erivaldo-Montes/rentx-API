import { Router } from "express";

import { ensureAutheticate } from "../middleware/ensureAuthenticate";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/createSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAutheticate);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
