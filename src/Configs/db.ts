import { Pool } from "pg";
import { config } from "dotenv";

config();

let cliant: Pool = new Pool({});

if (process.env.NODE_ENV === "development") {
  const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DB } = process.env;
  cliant = new Pool({
    host: PG_HOST,
    port: Number(PG_PORT),
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB,
  });
} else if (process.env.NODE_ENV === "test") {
  const {
    PG_TEST_HOST,
    PG_TEST_PORT,
    PG_TEST_USER,
    PG_TEST_PASSWORD,
    PG_TEST_DB,
  } = process.env;
  cliant = new Pool({
    host: PG_TEST_HOST as string,
    port: Number(PG_TEST_PORT),
    user: PG_TEST_USER as string,
    password: PG_TEST_PASSWORD as string,
    database: PG_TEST_DB as string,
  });
}

export default cliant;
