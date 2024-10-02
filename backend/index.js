const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "your_db_user",
  host: "localhost",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
