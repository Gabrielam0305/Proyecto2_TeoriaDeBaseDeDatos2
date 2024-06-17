import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Info.css"; // Import the CSS file correctly

function Info() {
  const [instanciaOrigen, setInstanciaOrigen] = useState("");
  const [baseOrigen, setBaseOrigen] = useState("");
  const [puertoOrigen, setPuertoOrigen] = useState("");
  const [usuarioOrigen, setUsuarioOrigen] = useState("");
  const [passwordOrigen, setPasswordOrigen] = useState("");

  const [instanciaDestino, setInstanciaDestino] = useState("");
  const [baseDestino, setBaseDestino] = useState("");
  const [puertoDestino, setPuertoDestino] = useState("");
  const [usuarioDestino, setUsuarioDestino] = useState("");
  const [passwordDestino, setPasswordDestino] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      instanciaOrigen,
      baseOrigen,
      puertoOrigen,
      usuarioOrigen,
      passwordOrigen,
      instanciaDestino,
      baseDestino,
      puertoDestino,
      usuarioDestino,
      passwordDestino,
    });
  };
  return (
    <div className="info-container">
      <h1>Configuración de Base de Datos</h1>
      <Form>
        <div className="two-column-form">
          <div className="form-column">
            <h3>Base de Datos de origen</h3>
            <Form.Group className="mb-3" controlId="formInstanciaOrigen">
              <Form.Label>Nombre Instancia:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Instancia"
                value={instanciaOrigen}
                onChange={(e) => setInstanciaOrigen(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBaseOrigen">
              <Form.Label>Nombre Base de Datos:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Base de Datos"
                value={baseOrigen}
                onChange={(e) => setBaseOrigen(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPuertoOrigen">
              <Form.Label>Puerto:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Puerto"
                value={puertoOrigen}
                onChange={(e) => setPuertoOrigen(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsuarioOrigen">
              <Form.Label>Nombre Usuario:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={usuarioOrigen}
                onChange={(e) => setUsuarioOrigen(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPasswordOrigen">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={passwordOrigen}
                onChange={(e) => setPasswordOrigen(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Probar
            </Button>
          </div>

          <div className="form-column">
            <h3>Base de Datos de Destino</h3>
            <Form.Group className="mb-3" controlId="formInstanciaDestino">
              <Form.Label>Nombre Instancia:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Instancia"
                value={instanciaDestino}
                onChange={(e) => setInstanciaDestino(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBaseDestino">
              <Form.Label>Nombre Base de Datos:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Base de Datos"
                value={baseDestino}
                onChange={(e) => setBaseDestino(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPuertoDestino">
              <Form.Label>Puerto:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Puerto"
                value={puertoDestino}
                onChange={(e) => setPuertoDestino(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsuarioDestino">
              <Form.Label>Nombre Usuario:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={usuarioDestino}
                onChange={(e) => setUsuarioDestino(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPasswordDestino">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={passwordDestino}
                onChange={(e) => setPasswordDestino(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Probar
            </Button>
          </div>
        </div>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
}

export default Info;
