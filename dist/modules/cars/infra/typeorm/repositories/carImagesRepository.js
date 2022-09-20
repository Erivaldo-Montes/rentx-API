"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarImagesRepository = void 0;

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

var _carImage = require("../entities/carImage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CarImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.default.getRepository(_carImage.CarImage);
  }

  async create(car_id, image_name) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });
    await this.repository.save(carImage);
    return carImage;
  }

}

exports.CarImagesRepository = CarImagesRepository;