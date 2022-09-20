"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("express-async-errors");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _upload = _interopRequireDefault(require("@config/upload"));

var _appError = require("@shared/errors/appError");

var _index = require("@shared/infra/typeorm/index");

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _routes = require("./routes");

require("@shared/container/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
(0, _index.createConnection)();
app.use("/docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default)); // procura as imgems de tmp

app.use("/avatar", _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use("/cars", _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use(_routes.routes);
app.use((err, request, response, next) => {
  if (err instanceof _appError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    message: `internal server error ${err}`
  });
});