const express = require("express");
const { Pool } = require("pg");
const sql = require("mssql");
const cors = require("cors");
const { DOMParser } = require("xmldom");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.options("*", cors());
const port = 3000;
app.use(bodyParser.json());

// Configuración para PostgreSQL
const pgPool = new Pool({
  user: "postgres",
  password: "lamejorcontra",
  host: "postgres.c4f8oexlglzn.us-east-1.rds.amazonaws.com",
  database: "postgresDatabase",
  port: 5432, // Puerto por defecto de PostgreSQL
  ssl: {
    rejectUnauthorized: false, // Necesario si usas SSL en tu base de datos PostgreSQL
  },
});

// Configuración para SQL Server
const sqlConfig = {
  user: "admin",
  password: "lamejorcontra",
  server: "sqlserver.c4f8oexlglzn.us-east-1.rds.amazonaws.com",
  database: "sqlserver",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  port: 1433,
};

// Conexión a PostgreSQL
pgPool.connect((err, client, done) => {
  if (err) {
    console.error("Error de conexión a PostgreSQL:", err);
    return;
  }
  console.log("Conexión a PostgreSQL exitosa");
});

// Conexión a SQL Server
sql
  .connect(sqlConfig)
  .then((pool) => {
    if (pool.connected) {
      console.log("Conexión a SQL Server exitosa");
    }
    return pool;
  })
  .catch((err) => console.error("Error de conexión a SQL Server:", err));

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto:", port);
});

function jsonToXml(json) {
  let xml = "<root>";

  Object.keys(json).forEach((key) => {
    xml += `<${key.toUpperCase()}>${json[key]}</${key.toUpperCase()}>`;
  });

  xml += "</root>";

  return xml;
}

function convertirXmlToJson(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const json = {};

  function xmlNodeToJson(node) {
    let value = {};

    if (node.hasChildNodes()) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        const tagName = child.tagName && child.tagName.toLowerCase();

        if (child.nodeType === 1) {
          // ELEMENT_NODE
          value[tagName] = xmlNodeToJson(child);
        } else if (child.nodeType === 3 && child.nodeValue.trim()) {
          // TEXT_NODE
          value = child.nodeValue.trim();
        }
      }
    }

    return value;
  }

  const rootElement = xmlDoc.documentElement;
  if (rootElement.hasChildNodes()) {
    for (let i = 0; i < rootElement.childNodes.length; i++) {
      const child = rootElement.childNodes[i];
      const tagName = child.tagName && child.tagName.toLowerCase();

      if (child.nodeType === 1) {
        // ELEMENT_NODE
        json[tagName] = xmlNodeToJson(child);
      } else if (child.nodeType === 3 && child.nodeValue.trim()) {
        // TEXT_NODE
        json[tagName] = child.nodeValue.trim();
      }
    }
  }

  return json;
}

app.post("/Postgres-SQLServer", async (req, res) => {
  const parametros = req.body.parametros;

  if (!parametros || !Array.isArray(parametros)) {
    return res
      .status(400)
      .json({ error: "Se esperaba un array de parámetros." });
  }

  let pgClient;
  try {
    // Obtener una conexión de PostgreSQL
    pgClient = await pgPool.connect();

    // Consultar los datos en PostgreSQL
    const pgQuery = `SELECT * FROM LogTable WHERE Tabla IN (${parametros
      .map((param) => `'${param}'`)
      .join(",")}) AND ReplicateSQLServer = FALSE`;
    const pgResult = await pgClient.query(pgQuery);

    // Conectar a SQL Server
    await sql.connect(sqlConfig);

    // Insertar los datos en SQL Server
    await Promise.all(
      pgResult.rows.map(async (row) => {
        const request = new sql.Request();
        const sqlString = `
        INSERT INTO LogTable (Tabla, Operacion, Detalles, ReplicateSQLServer, ReplicatePostgres, Timestamp) 
        VALUES (@Tabla, @Operacion, @Detalles, @ReplicateSQLServer, @ReplicatePostgres, @Timestamp)
      `;

        // Verificar si algún valor es nulo y manejarlo adecuadamente
        await request
          .input("Tabla", sql.VarChar, row.tabla || "")
          .input("Operacion", sql.VarChar, row.operacion || "")
          .input("Detalles", sql.Text, jsonToXml(JSON.parse(row.detalles)))
          .input(
            "ReplicateSQLServer",
            sql.Bit,
            row.replicatesqlserver != null ? row.replicatesqlserver : false
          )
          .input(
            "ReplicatePostgres",
            sql.Bit,
            row.replicatepostgres != null ? row.replicatepostgres : false
          )
          .input("Timestamp", sql.DateTime, row.timestamp || new Date())
          .query(sqlString);
      })
    );

    // Actualizar los registros en PostgreSQL
    const pgUpdateQuery = `UPDATE LogTable SET ReplicateSQLServer = TRUE WHERE Tabla IN (${parametros
      .map((param) => `'${param}'`)
      .join(",")}) AND ReplicateSQLServer = FALSE`;
    await pgClient.query(pgUpdateQuery);

    res.json({ message: "Datos consultados e insertados en SQL Server." });
  } catch (err) {
    console.error("Error al consultar e insertar datos:", err);
    return res.status(500).json({
      error:
        "Ocurrió un error al consultar e insertar los datos en SQL Server.",
    });
  } finally {
    // Liberar la conexión de PostgreSQL si está disponible
    if (pgClient) {
      pgClient.release();
    }
  }
});

app.post("/SQLServer-Postgres", async (req, res) => {
  const parametros = req.body.parametros;

  if (!parametros || !Array.isArray(parametros)) {
    return res
      .status(400)
      .json({ error: "Se esperaba un array de parámetros." });
  }

  try {
    const request = new sql.Request();

    // Consultar los datos en SQL Server
    var sqlString = `SELECT * FROM LogTable WHERE Tabla IN (${parametros
      .map((param) => `'${param}'`)
      .join(",")}) AND ReplicatePostgres = 0`;
    const result = await request.query(sqlString);

    // Insertar los datos en PostgreSQL
    await Promise.all(
      result.recordset.map(async (row) => {
        await pgPool.query(
          "INSERT INTO LogTable (Tabla, Operacion, Detalles, ReplicateSQLServer, ReplicatePostgres, Timestamp) VALUES ($1, $2, $3, $4, $5, $6)",
          [
            row.Tabla,
            row.Operacion,
            convertirXmlToJson(row.Detalles),
            row.ReplicateSQLServer,
            row.ReplicatePostgres,
            row.Timestamp,
          ]
        );
      })
    );

    sqlString = `UPDATE LogTable SET ReplicatePostgres = 1 WHERE Tabla IN (${parametros
      .map((param) => `'${param}'`)
      .join(",")}) AND ReplicatePostgres = 0`;
    await request.query(sqlString);

    res.json({ message: "Datos consultados e insertados en PostgreSQL." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error:
        "Ocurrió un error al consultar e insertar los datos en PostgreSQL.",
    });
  }
});

app.post("/VistaSqlServer", async (req, res) => {
  try {
    // Crear una nueva conexión
    const pool = await sql.connect(sqlConfig);

    // Consulta a la vista para obtener solo los nombres de las tablas
    const result = await pool
      .request()
      .query("select Table_Name from View_AllTables");

    // Obtener solo los nombres de las tablas del resultado
    const tableNames = result.recordset.map((row) => row.Table_Name);

    // Enviar nombres de las tablas como respuesta
    res.json(tableNames);
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    res.status(500).json({ error: "Error de servidor" });
  }
});

app.post("/VistaPostgres", async (req, res) => {
  try {
    // Conectar a la base de datos
    const client = await pgPool.connect();

    // Consulta a la vista para obtener solo los nombres de las tablas
    const result = await client.query("SELECT table_name FROM View_AllTables");

    // Obtener solo los nombres de las tablas del resultado
    const tableNames = result.rows.map((row) => row.table_name);

    // Enviar nombres de las tablas como respuesta
    res.json(tableNames);

    // Liberar el cliente
    client.release();
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    res.status(500).json({ error: "Error de servidor" });
  }
});

app.post("/test", async (req, res) => {
  let a = '{"id":1,"nombre":"salero","edad":39}';
  console.log(jsonToXml(a));
  res.send(a);
});


app.post("/lastTimePostgres", async (req, res) => {
  try {
    const client = await pgPool.connect();
    const result = await client.query(`SELECT * FROM LastExecutionView;`);
    const lastExecution = result.rows[0].last_execution_time.toString();
    res.send(lastExecution);
    client.release();
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    res.status(500).send("Error de servidor");
  }
});

app.post("/lastTimeSQLServer", async (req, res) => {
  try {
    // Crear una nueva conexión
    const pool = await sql.connect(sqlConfig);

    // Ejecutar la consulta a la vista
    const result = await pool.request().query("SELECT * FROM LastExecutionView");

    // Obtener el resultado
    const lastExecution = result.recordset[0].LastExecutionTime.toString();

    // Enviar el resultado como respuesta
    res.send(lastExecution);
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    res.status(500).send("Error de servidor");
  }
});

