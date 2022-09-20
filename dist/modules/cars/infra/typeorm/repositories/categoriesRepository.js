"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _index = _interopRequireDefault(require("@shared/infra/typeorm/index"));

var _category = require("../entities/category");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _index.default.getRepository(_category.Category);
  }

  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      name,
      description
    });
    await this.repository.save(category);
  }

  async list() {
    const categoryList = await this.repository.find();
    return categoryList;
  }

  async findByName(name) {
    const category = await this.repository.findOne({
      where: {
        name
      }
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;