"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _index = _interopRequireDefault(require("@shared/infra/typeorm/index"));

var _user = require("../entities/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _index.default.getRepository(_user.User);
  }

  async findById(id) {
    const user = await this.repository.findOne({
      where: {
        id
      }
    });
    return user;
  }

  async findByEmail(email) {
    const user = await this.repository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id
  }) {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      id,
      avatar
    });
    await this.repository.save(user);
  }

}

exports.UsersRepository = UsersRepository;