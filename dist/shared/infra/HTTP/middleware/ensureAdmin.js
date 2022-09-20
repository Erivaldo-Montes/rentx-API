"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _usersRepository = require("@modules/accounts/infra/typorm/repositories/usersRepository");

var _appError = require("@shared/errors/appError");

async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const userRepository = new _usersRepository.UsersRepository();
  const user = await userRepository.findById(id);

  if (!user.admin) {
    throw new _appError.AppError("user is not admin", 401);
  }

  return next();
}