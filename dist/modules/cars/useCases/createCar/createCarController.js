"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarController = void 0;

var _tsyringe = require("tsyringe");

var _createCarUseCase = require("./createCarUseCase");

class CreateCarController {
  async handle(request, response) {
    const {
      name,
      description,
      daily_rate,
      fine_amount,
      brand,
      license_plate,
      category_id
    } = request.body;

    const createCarUseCase = _tsyringe.container.resolve(_createCarUseCase.CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      daily_rate,
      fine_amount,
      brand,
      license_plate,
      category_id
    });
    return response.status(201).json(car);
  }

}

exports.CreateCarController = CreateCarController;