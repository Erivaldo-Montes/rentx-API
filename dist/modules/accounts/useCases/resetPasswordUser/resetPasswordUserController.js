"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUserController = void 0;

var _tsyringe = require("tsyringe");

var _resetPasswordUserUseCase = require("./resetPasswordUserUseCase");

class ResetPasswordUserController {
  async handle(request, response) {
    const {
      token
    } = request.query;
    const {
      password
    } = request.body;

    const resetPasswordUserUseCase = _tsyringe.container.resolve(_resetPasswordUserUseCase.ResetPasswordUserUseCase);

    await resetPasswordUserUseCase.execute({
      password,
      token: String(token)
    });
    return response.send();
  }

}

exports.ResetPasswordUserController = ResetPasswordUserController;