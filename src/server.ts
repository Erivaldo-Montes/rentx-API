import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { createConnection } from "./database/index";
import { routes } from "./routes";
import "./shared/container/index";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

createConnection();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.listen(3333, () => console.log(">>>>> running..."));
