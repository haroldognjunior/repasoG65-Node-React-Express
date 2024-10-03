const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Cambia esto según tu usuario de MySQL
  password: "Nxt789V123", // Cambia esto según tu contraseña de MySQL
  database: "joyas", // Cambia esto según el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Endpoint para obtener todos los productos
app.get("/api/products", (req, res) => {
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint para obtener un producto por ID
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results[0]);
    }
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
