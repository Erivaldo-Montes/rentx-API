import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./passwordRoutes.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationRoutes);
routes.use("/users", userRoutes);
routes.use("/cars", carRoutes);
routes.use("/rentals", rentalsRoutes);
routes.use("/password", passwordRoutes);

routes.use(authenticateRoutes);

export { routes };
