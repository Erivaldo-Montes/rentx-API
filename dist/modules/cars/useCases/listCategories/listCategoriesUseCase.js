"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoriesUseCase = void 0;

var _tsyringe = require("tsyringe");

var _categoriesRepository = require("../../infra/typeorm/repositories/categoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let ListCategoriesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _categoriesRepository.CategoriesRepository === "undefined" ? Object : _categoriesRepository.CategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListCategoriesUseCase {
  constructor(CategoriesRepository) {
    this.CategoriesRepository = CategoriesRepository;
  }

  async execute() {
    const allCategories = await this.CategoriesRepository.list();
    return allCategories;
  }

}) || _class) || _class) || _class) || _class);
exports.ListCategoriesUseCase = ListCategoriesUseCase;