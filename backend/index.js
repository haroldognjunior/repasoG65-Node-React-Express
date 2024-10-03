// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// const connection = mysql.createConnection({
// host: "localhost",
// user: "root", // Cambia esto según tu usuario de MySQL
// password: "Nxt789V123", // Cambia esto según tu contraseña de MySQL
// database: "joyas", // Cambia esto según el nombre de tu base de datos
// });

// connection.connect((err) => {
// if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
// }
// console.log("Connected to MySQL database");
// });

// // Endpoint para obtener todos los productos
// app.get("/api/products", (req, res) => {
// connection.query("SELECT * FROM products", (err, results) => {
//     if (err) {
//     return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
// });
// });

// // Endpoint para obtener un producto por ID
// app.get("/api/products/:id", (req, res) => {
// const { id } = req.params;
// connection.query(
//     "SELECT * FROM products WHERE id = ?",
//     [id],
//     (err, results) => {
//     if (err) {
//         return res.status(500).json({ error: err.message });
//     }
//     res.json(results[0]);
//     }
// );
// });

// // Iniciar el servidor
// app.listen(port, () => {
// console.log(`Server running at http://localhost:${port}`);
// });

// En mi caso, tengo el mysql, por eso deben desestimar esa configuración y usar la de postgres mediante pg

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

app.get("/api/products", async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  res.json(result.rows[0]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
