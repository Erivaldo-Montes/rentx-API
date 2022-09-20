"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAutheticate = ensureAutheticate;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("@config/auth"));

var _appError = require("@shared/errors/appError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAutheticate(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _appError.AppError("token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _appError.AppError("invalid token", 401);
  }
}