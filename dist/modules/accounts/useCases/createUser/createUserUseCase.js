"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");

var _appError = require("@shared/errors/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute({
    name,
    password,
    email,
    driver_license
  }) {
    const emailAlreadyExist = await this.repository.findByEmail(email);

    if (emailAlreadyExist) {
      throw new _appError.AppError("user already exists");
    }

    const passwordHash = await (0, _bcrypt.hash)(password, 8);
    await this.repository.create({
      name,
      password: passwordHash,
      email,
      driver_license
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;