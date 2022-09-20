"use strict";

var _tsyringe = require("tsyringe");

require("@shared/container/providers/index");

var _usersRepository = require("@modules/accounts/infra/typorm/repositories/usersRepository");

var _usersTokensRepository = require("@modules/accounts/infra/typorm/repositories/usersTokensRepository");

var _carImagesRepository = require("@modules/cars/infra/typeorm/repositories/carImagesRepository");

var _carsRepository = require("@modules/cars/infra/typeorm/repositories/carsRepository");

var _categoriesRepository = require("@modules/cars/infra/typeorm/repositories/categoriesRepository");

var _specificationsRepository = require("@modules/cars/infra/typeorm/repositories/specificationsRepository");

var _rentalsRepository = require("@modules/rentals/infra/typeorm/repositories/rentalsRepository");

_tsyringe.container.registerSingleton("CategoriesRepository", _categoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton("SpecificationsRepository", _specificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton("UsersRepository", _usersRepository.UsersRepository);

_tsyringe.container.registerSingleton("CarsRepository", _carsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarImagesRespository", _carImagesRepository.CarImagesRepository);

_tsyringe.container.registerSingleton("RentalsRepository", _rentalsRepository.RentalsRepository);

_tsyringe.container.registerSingleton("UsersTokensRepository", _usersTokensRepository.UsersTokensRepository);