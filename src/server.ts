import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import { createConnection } from "./database/index";
import { AppError } from "./errors/appError";
import { routes } from "./routes";
import "@shared/container/index";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

createConnection();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.listen(3333, () => console.log(">>>>> running"));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: `internal server error ${err.message}`,
    });
  },
);
