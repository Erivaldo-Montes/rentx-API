import { Router } from "express";

import { userRoutes } from "../modules/cars/useCases/users.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);

routes.use("/specifications", specificationRoutes);

routes.use("/user", userRoutes);

export { routes };
