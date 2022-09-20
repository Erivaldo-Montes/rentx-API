"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalController = void 0;

var _tsyringe = require("tsyringe");

var _createRentalUseCase = require("./createRentalUseCase");

class CreateRentalController {
  async handle(request, response) {
    const {
      car_id,
      expected_return_date
    } = request.body;
    const {
      id
    } = request.user;

    const createRentalUseCase = _tsyringe.container.resolve(_createRentalUseCase.CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id: id,
      expected_return_date
    });
    return response.status(201).json(rental);
  }

}

exports.CreateRentalController = CreateRentalController;