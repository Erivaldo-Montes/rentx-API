"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@config/upload"));

var _createCarController = require("@modules/cars/useCases/createCar/createCarController");

var _createCarSpecificationsController = require("@modules/cars/useCases/createCarSpecification/createCarSpecificationsController");

var _listAvailableCarsController = require("@modules/cars/useCases/listAvailableCars/listAvailableCarsController");

var _uploadCarImagesController = require("@modules/cars/useCases/uploadCarImages/uploadCarImagesController");

var _ensureAdmin = require("../middleware/ensureAdmin");

var _ensureAuthenticate = require("../middleware/ensureAuthenticate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carRoutes = (0, _express.Router)();
exports.carRoutes = carRoutes;
const createCarController = new _createCarController.CreateCarController();
const listAvailableCarsController = new _listAvailableCarsController.ListAvailableCarsController();
const createCarSpecificationController = new _createCarSpecificationsController.CreateCarSpecificationController();
const uploadCarImagesController = new _uploadCarImagesController.UploadCarImagesController();
const upload = (0, _multer.default)(_upload.default);
carRoutes.post("/", _ensureAuthenticate.ensureAutheticate, _ensureAdmin.ensureAdmin, createCarController.handle);
carRoutes.get("/available", listAvailableCarsController.handle);
carRoutes.post("/specifications/:id", _ensureAuthenticate.ensureAutheticate, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carRoutes.post("/images/:id", _ensureAuthenticate.ensureAutheticate, _ensureAdmin.ensureAdmin, upload.array("images"), uploadCarImagesController.handle);