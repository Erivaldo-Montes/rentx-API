"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _createCategoryController = require("@modules/cars/useCases/createCategory/createCategoryController");

var _importCategoriesController = require("@modules/cars/useCases/importCategories/importCategoriesController");

var _listCategoriesController = require("@modules/cars/useCases/listCategories/listCategoriesController");

var _ensureAdmin = require("../middleware/ensureAdmin");

var _ensureAuthenticate = require("../middleware/ensureAuthenticate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)({
  dest: "./tmp"
});
const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const createCategoryController = new _createCategoryController.CreateCategoryController();
const importCategoriesController = new _importCategoriesController.ImportCategoriesController();
const listCategoriesController = new _listCategoriesController.ListCategoriesController();
categoriesRoutes.post("/", _ensureAuthenticate.ensureAutheticate, _ensureAdmin.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", _ensureAuthenticate.ensureAutheticate, _ensureAdmin.ensureAdmin, upload.single("file"), importCategoriesController.handle);