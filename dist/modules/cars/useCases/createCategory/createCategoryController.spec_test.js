"use strict";

var _bcrypt = require("bcrypt");

var _crypto = require("crypto");

var _supertest = _interopRequireDefault(require("supertest"));

var _app = require("@shared/infra/HTTP/app");

var _index = require("@shared/infra/typeorm/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Create category", () => {
  beforeAll(async () => {
    connection = await (0, _index.createConnection)();
    await connection.runMigrations();
    const id = (0, _crypto.randomUUID)();
    const password = await (0, _bcrypt.hash)("admin", 8);
    await connection.query(`INSERT INTO users(id, name, email, password, admin, created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX')`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });
  it("Should be able to list categories", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/session").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    console.log(responseToken);
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "category1",
      description: "category1 description"
    });
    expect(response.status).toBe(201);
  });
});