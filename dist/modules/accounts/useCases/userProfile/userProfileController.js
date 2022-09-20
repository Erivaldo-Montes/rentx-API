"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfileController = void 0;

var _tsyringe = require("tsyringe");

var _userProfileUseCase = require("./userProfileUseCase");

class UserProfileController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const userProfileUseCase = _tsyringe.container.resolve(_userProfileUseCase.UserProfileUseCase);

    const user = await userProfileUseCase.execute(id);
    return response.json(user);
  }

}

exports.UserProfileController = UserProfileController;