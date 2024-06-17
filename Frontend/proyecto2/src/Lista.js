import React, { useState } from "react";
import ReactDOM from "react-dom";

const Lista = () => {
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
