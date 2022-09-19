import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { UserProfileController } from "@modules/accounts/useCases/userProfile/userProfileController";
import { ensureAutheticate } from "@shared/infra/HTTP/middleware/ensureAuthenticate";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAutheticate,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle,
);

userRoutes.get("/profile", ensureAutheticate, userProfileController.handle);

export { userRoutes };
