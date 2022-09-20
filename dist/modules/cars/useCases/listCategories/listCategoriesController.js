"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoriesController = void 0;

var _tsyringe = require("tsyringe");

var _listCategoriesUseCase = require("./listCategoriesUseCase");

class ListCategoriesController {
  async handle(request, response) {
    const listCategoriesUseCase = _tsyringe.container.resolve(_listCategoriesUseCase.ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();
    return response.json({
      categories
    });
  }

}

exports.ListCategoriesController = ListCategoriesController;