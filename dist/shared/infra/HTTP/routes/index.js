"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _authenticate = require("./authenticate.routes");

var _cars = require("./cars.routes");

var _categories = require("./categories.routes");

var _passwordRoutes = require("./passwordRoutes.routes");

var _rentals = require("./rentals.routes");

var _specifications = require("./specifications.routes");

var _users = require("./users.routes");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use("/categories", _categories.categoriesRoutes);
routes.use("/specifications", _specifications.specificationRoutes);
routes.use("/users", _users.userRoutes);
routes.use("/cars", _cars.carRoutes);
routes.use("/rentals", _rentals.rentalsRoutes);
routes.use("/password", _passwordRoutes.passwordRoutes);
routes.use(_authenticate.authenticateRoutes);