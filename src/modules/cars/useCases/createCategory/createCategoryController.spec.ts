import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/HTTP/app";
import { createConnection } from "@shared/infra/typeorm/index";

let connection: DataSource;

describe("Create category", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = randomUUID();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, admin, created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("Should be able to list categories", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    console.log(responseToken);

    const response = await request(app).post("/categories").send({
      name: "category1",
      description: "category1 description",
    });

    expect(response.status).toBe(201);
  });
});
