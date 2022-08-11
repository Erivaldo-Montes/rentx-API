import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/createSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAutheticate);

export { specificationRoutes };
