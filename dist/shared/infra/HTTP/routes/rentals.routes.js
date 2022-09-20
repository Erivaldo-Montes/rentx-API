"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalsRoutes = void 0;

var _express = require("express");

var _createRentalController = require("@modules/rentals/useCases/createRental/createRentalController");

var _devolutionRentalController = require("@modules/rentals/useCases/devolutionRental/devolutionRentalController");

var _listRentalsByUserController = require("@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController");

var _ensureAuthenticate = require("../middleware/ensureAuthenticate");

const rentalsRoutes = (0, _express.Router)();
exports.rentalsRoutes = rentalsRoutes;
const createRentalController = new _createRentalController.CreateRentalController();
const devolutionRentalController = new _devolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _listRentalsByUserController.ListRentalsByUserController();
rentalsRoutes.post("/", _ensureAuthenticate.ensureAutheticate, createRentalController.handle);
rentalsRoutes.post("/devolution/:id", _ensureAuthenticate.ensureAutheticate, devolutionRentalController.handle);
rentalsRoutes.get("/user", _ensureAuthenticate.ensureAutheticate, listRentalsByUserController.handle);