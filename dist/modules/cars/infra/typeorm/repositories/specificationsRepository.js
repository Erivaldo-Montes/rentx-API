"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;

var _specification = require("@modules/cars/infra/typeorm/entities/specification");

var _index = _interopRequireDefault(require("@shared/infra/typeorm/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SpecificationsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _index.default.getRepository(_specification.Specification);
  }

  async create({
    name,
    description
  }) {
    const specification = this.repository.create({
      name,
      description
    });
    await this.repository.save(specification);
    return specification;
  }

  async findByName(name) {
    const specification = await this.repository.findOne({
      where: {
        name
      }
    });
    return specification;
  }

  async findByIds(ids) {
    const specificationsArray = await this.repository.find();
    const specifications = specificationsArray.filter(specification => {
      const re = ids.find(id => specification.id === id);
      return re;
    });
    return specifications;
  }

}

exports.SpecificationsRepository = SpecificationsRepository;