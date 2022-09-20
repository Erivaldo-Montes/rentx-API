"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;

var _user = require("../../infra/typorm/entities/user");

class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async create({
    name,
    email,
    password,
    driver_license
  }) {
    const user = new _user.User();
    Object.assign(user, {
      name,
      email,
      password,
      driver_license
    });
    this.users.push(user);
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findById(id) {
    return this.users.find(user => user.id === id);
  }

}

exports.UsersRepositoryInMemory = UsersRepositoryInMemory;