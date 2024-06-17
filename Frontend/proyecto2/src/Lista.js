import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Lista = () => {
  const realizarPeticion = async () => {
    let urlPostgres = "http://localhost:3000/VistaPostgres";
    let url = "http://localhost:3000/VistaSqlServer";

    const body = {
      nombre: {},
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await axios.post(url, body, config);
      const responseData = res.data; // Assuming the response is an array of objects
      console.log("se realizo la peticion");
      // Assuming responseData is an array with one object as in your example
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error in the request:", error.response.data.descripcion);
      } else {
        console.log("Error in the request:", error.message);
      }
    }
  };

  useEffect(() => {
    realizarPeticion();
  }, []);
  const [sinReplicar, setSinReplicar] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
  ]);
  const [replicando, setReplicando] = useState([]);

  const moveToReplicando = (item) => {
    setSinReplicar(sinReplicar.filter((i) => i !== item));
    setReplicando([...replicando, item]);
  };

  const moveToSinReplicar = (item) => {
    setReplicando(replicando.filter((i) => i !== item));
    setSinReplicar([...sinReplicar, item]);
  };

  return (
    <div>
      <h1>Tablas BD Origen</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Sin Replicar</h2>
          <ul>
            {sinReplicar.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "0 20px" }}
        >
          <button onClick={() => moveToReplicando(sinReplicar[0])}>
            &gt;&gt;
          </button>
          <button onClick={() => moveToSinReplicar(replicando[0])}>
            &lt;&lt;
          </button>
        </div>
        <div>
          <h2>Replicando</h2>
          <ul>
            {replicando.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button onClick={() => alert("Guardar")}>Guardar</button>
        <button
          onClick={() => alert("Cancelar")}
          style={{ marginLeft: "10px" }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<Lista />, document.getElementById("root"));
export default Lista;
