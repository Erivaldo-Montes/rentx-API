"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalController = void 0;

var _tsyringe = require("tsyringe");

var _devolutionRentalUseCase = require("./devolutionRentalUseCase");

class DevolutionRentalController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const {
      id: user_id
    } = request.user;

    const devolitionRentalUseCase = _tsyringe.container.resolve(_devolutionRentalUseCase.DevolutionRentalUseCase);

    const rental = await devolitionRentalUseCase.execute({
      user_id,
      id
    });
    return response.status(200).json(rental);
  }

}

exports.DevolutionRentalController = DevolutionRentalController;