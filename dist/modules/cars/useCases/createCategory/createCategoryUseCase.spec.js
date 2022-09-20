"use strict";

var _categoriesRepositoryInMemory = require("@modules/cars/repositories/in-memory/categoriesRepositoryInMemory");

var _appError = require("@shared/errors/appError");

var _createCategoryUseCase = require("./createCategoryUseCase");

let categoriesRepositoryInMemory;
let createCategoryUseCase;
describe("create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _categoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _createCategoryUseCase.CreatecategoryUseCase(categoriesRepositoryInMemory);
  });
  it("Should be able to create a new category", async () => {
    const category = {
      name: "category test",
      description: "description category test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    expect(categoryCreated).toHaveProperty("id");
  });
  it("Should not be able to create a new category with name exists", async () => {
    const category = {
      name: "category test",
      description: "description category test"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new _appError.AppError("category alredy exists"));
  });
});