import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { ensureAutheticate } from "@shared/infra/HTTP/middleware/ensureAuthenticate";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAutheticate,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle,
);

export { userRoutes };
