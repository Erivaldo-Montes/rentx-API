"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoriesController = void 0;

var _tsyringe = require("tsyringe");

var _importCategoriesUseCase = require("./importCategoriesUseCase");

class ImportCategoriesController {
  async handle(request, response) {
    const {
      file
    } = request;

    const importCategoriesUseCase = _tsyringe.container.resolve(_importCategoriesUseCase.ImportCategoriesUseCase);

    await importCategoriesUseCase.execute(file);
    return response.status(201).send();
  }

}

exports.ImportCategoriesController = ImportCategoriesController;