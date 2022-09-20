"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatecategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICategoriesRepository = require("@modules/cars/repositories/ICategoriesRepository");

var _appError = require("@shared/errors/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreatecategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoryRepository === "undefined" ? Object : _ICategoriesRepository.ICategoryRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreatecategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({
    name,
    description
  }) {
    const categoryExist = await this.categoriesRepository.findByName(name);

    if (categoryExist) {
      throw new _appError.AppError("category alredy exists");
    }

    this.categoriesRepository.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreatecategoryUseCase = CreatecategoryUseCase;