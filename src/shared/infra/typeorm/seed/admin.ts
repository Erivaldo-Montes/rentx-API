import { hash } from "bcrypt";
import { randomUUID } from "crypto";

import { createConnection } from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = randomUUID();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, admin, created_at, driver_license)
  values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX')`,
  );

  connection.destroy();
}

create().then(() => console.log("admin is created"));
