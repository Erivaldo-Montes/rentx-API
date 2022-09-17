import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/appError";
import { createConnection } from "@shared/infra/typeorm/index";

import swaggerFile from "../../../swagger.json";
import { routes } from "./routes";

import "@shared/container/index";

const app = express();

app.use(express.json());
createConnection();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: `internal server error ${err}`,
    });
  },
);

export { app };
