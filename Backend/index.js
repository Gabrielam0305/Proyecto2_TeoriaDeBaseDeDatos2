const express = require("express");
const { Pool } = require("pg");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.options("*", cors());
const port = 3000;

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

function convertirJsonToXml(jsonData) {
  let xmlString = "<root>";
  for (const key in jsonData) {
    if (Object.hasOwnProperty.call(jsonData, key)) {
      xmlString += `<${key.toUpperCase()}>${
        jsonData[key]
      }</${key.toUpperCase()}>`;
    }
  }
  xmlString += "</root>";
  return xmlString;
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
