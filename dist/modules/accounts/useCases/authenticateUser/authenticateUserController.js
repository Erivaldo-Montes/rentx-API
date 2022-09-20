"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;

var _tsyringe = require("tsyringe");

var _authenticateUserUseCase = require("./authenticateUserUseCase");

class AuthenticateUserController {
  async handle(request, response) {
    const {
      email,
      password
    } = request.body;

    const autheticateUserUseCase = _tsyringe.container.resolve(_authenticateUserUseCase.AuthenticateUserUseCase);

    const token = await autheticateUserUseCase.execute({
      email,
      password
    });
    return response.status(200).json(token);
  }

}

exports.AuthenticateUserController = AuthenticateUserController;