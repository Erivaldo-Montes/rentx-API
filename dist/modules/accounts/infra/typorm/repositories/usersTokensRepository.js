"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

var _userToken = require("../entities/userToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.default.getRepository(_userToken.UserToken);
  }

  async create({
    expires_date,
    user_id,
    refresh_token
  }) {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date
    });
    await this.repository.save(userToken);
    return userToken;
  }

  findByUserIdAndRefreshToken(user_id, refresh_token) {
    return this.repository.findOne({
      where: {
        user_id,
        refresh_token
      }
    });
  }

  async deleteById(id) {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token) {
    return this.repository.findOne({
      where: {
        refresh_token
      }
    });
  }

}

exports.UsersTokensRepository = UsersTokensRepository;