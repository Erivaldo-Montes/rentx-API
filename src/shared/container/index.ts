import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typorm/repositories/usersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/categoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/specificationsRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);
