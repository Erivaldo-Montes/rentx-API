import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/categoriesRepositoryInMemory";
import { AppError } from "@shared/errors/appError";

import { CreatecategoryUseCase } from "./createCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreatecategoryUseCase;

describe("create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    createCategoryUseCase = new CreatecategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });
  it("Should be able to create a new category", async () => {
    const category = {
      name: "category test",
      description: "description category test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "category test",
        description: "description category test",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
