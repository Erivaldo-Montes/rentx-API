import { Router } from "express";

import { CreateUserController } from "../../accounts/useCases/createUser/createUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

export { userRoutes };
