"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationRoutes = void 0;

var _express = require("express");

var _createSpecificationController = require("@modules/cars/useCases/createSpecification/createSpecificationController");

var _ensureAdmin = require("@shared/infra/HTTP/middleware/ensureAdmin");

var _ensureAuthenticate = require("@shared/infra/HTTP/middleware/ensureAuthenticate");

const specificationRoutes = (0, _express.Router)();
exports.specificationRoutes = specificationRoutes;
const createSpecificationController = new _createSpecificationController.CreateSpecificationController();
specificationRoutes.post("/", _ensureAuthenticate.ensureAutheticate, _ensureAdmin.ensureAdmin, createSpecificationController.handle);