"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@config/upload"));

var _createUserController = require("@modules/accounts/useCases/createUser/createUserController");

var _updateUserAvatarController = require("@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController");

var _userProfileController = require("@modules/accounts/useCases/userProfile/userProfileController");

var _ensureAuthenticate = require("@shared/infra/HTTP/middleware/ensureAuthenticate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _createUserController.CreateUserController();
const updateUserAvatarController = new _updateUserAvatarController.UpdateUserAvatarController();
const userProfileController = new _userProfileController.UserProfileController();
userRoutes.post("/", createUserController.handle);
userRoutes.patch("/avatar", _ensureAuthenticate.ensureAutheticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
userRoutes.get("/profile", _ensureAuthenticate.ensureAutheticate, userProfileController.handle);