"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");

var _IUsersTokenRepository = require("@modules/accounts/repositories/IUsersTokenRepository");

var _IDateProvider = require("@shared/container/providers/dateProvider/IDateProvider");

var _appError = require("@shared/errors/appError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ResetPasswordUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokenRepository.IUsersTokenRepository === "undefined" ? Object : _IUsersTokenRepository.IUsersTokenRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUserUseCase {
  constructor(userTokensRepository, dateProvider, usersRepository) {
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
    this.usersRepository = usersRepository;
  }

  async execute({
    password,
    token
  }) {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);
    console.log(token);

    if (!userToken) {
      throw new _appError.AppError("invalid token");
    }

    if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new _appError.AppError("expired token");
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    user.password = await (0, _bcrypt.hash)(password, 8);
    await this.usersRepository.create(user);
    await this.userTokensRepository.deleteById(userToken.id);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUserUseCase = ResetPasswordUserUseCase;