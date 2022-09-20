"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _userToken = require("@modules/accounts/infra/typorm/entities/userToken");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    expires_date,
    user_id,
    refresh_token
  }) {
    const userToken = new _userToken.UserToken();
    Object.assign(userToken, {
      expires_date,
      user_id,
      refresh_token
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.usersTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token);
    return userToken;
  }

  async deleteById(id) {
    const userToken = this.usersTokens.find(userToken => userToken.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token) {
    return this.usersTokens.find(userToken => userToken.refresh_token === refresh_token);
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;