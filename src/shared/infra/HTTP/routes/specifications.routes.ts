import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";
import { ensureAdmin } from "@shared/infra/HTTP/middleware/ensureAdmin";
import { ensureAutheticate } from "@shared/infra/HTTP/middleware/ensureAuthenticate";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
  "/",
  ensureAutheticate,
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationRoutes };
