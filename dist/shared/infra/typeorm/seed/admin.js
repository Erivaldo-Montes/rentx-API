"use strict";

var _bcrypt = require("bcrypt");

var _crypto = require("crypto");

var _index = require("../index");

async function create() {
  const connection = await (0, _index.createConnection)("localhost");
  const id = (0, _crypto.randomUUID)();
  const password = await (0, _bcrypt.hash)("admin", 8);
  await connection.query(`INSERT INTO users(id, name, email, password, admin, created_at, driver_license)
  values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX')`);
  connection.destroy();
}

create().then(() => console.log("admin is created"));