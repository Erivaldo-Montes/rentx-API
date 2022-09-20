"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _listAvailableCarsUseCase = require("./listAvailableCarsUseCase");

class ListAvailableCarsController {
  async handle(request, response) {
    const {
      category_id,
      name,
      brand
    } = request.query;

    const listAvailableUseCase = _tsyringe.container.resolve(_listAvailableCarsUseCase.ListAvailableCarsUseCase);

    const cars = await listAvailableUseCase.execute({
      category_id: category_id,
      name: name,
      brand: brand
    });
    return response.status(200).json(cars);
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;