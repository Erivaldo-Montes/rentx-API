"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _resetPasswordUserController = require("@modules/accounts/useCases/resetPasswordUser/resetPasswordUserController");

var _sendForgotPasswordMailController = require("@modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordController = new _sendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPassWordUserController = new _resetPasswordUserController.ResetPasswordUserController();
passwordRoutes.post("/forgot", sendForgotPasswordController.handle);
passwordRoutes.post("/reset", resetPassWordUserController.handle);