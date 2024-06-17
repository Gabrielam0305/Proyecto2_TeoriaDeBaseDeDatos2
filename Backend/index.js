const express = require("express");
const sql = require("mssql");

const app = express();
const port = 3000;

const dbConfig = {
  user: "admin",
  password: "lamejorcontra",
  server: "sqlserver.c4f8oexlglzn.us-east-1.rds.amazonaws.com",
  database: "nombre_de_tu_base_de_datos",
  options: {
    encrypt: true, // Usar en Azure
    trustServerCertificate: false, // Cambiar a true para un entorno de desarrollo
  },
  port: 1433,
};

sql
  .connect(dbConfig)
  .then((pool) => {
    if (pool.connected) {
      console.log("Conexión a la base de datos exitosa");
    }
    return pool;
  })
  .catch((err) => console.error("Error de conexión a la base de datos:", err));

app.get("/api/data", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM tu_tabla");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

const bodyParser = require("body-parser");
var urlencodeparser = bodyParser.urlencoded({ extended: true });
app.use(urlencodeparser);
app.listen(port, () => {
  console.log("corriendo en ", port);
});
