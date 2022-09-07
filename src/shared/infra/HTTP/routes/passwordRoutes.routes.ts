import { Router } from "express";

import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", sendForgotPasswordController.handle);

export { passwordRoutes };
