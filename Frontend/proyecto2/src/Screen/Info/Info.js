import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Info.css"; // Import the CSS file correctly

function Info() {
  return (
    <div className="info-container">
      <h1>Configuración de Base de Datos</h1>
      <Form>
        <div className="two-column-form">
          <div className="form-column">
            <h3>Base de Datos de origen</h3>
            <Form.Group className="mb-3" controlId="formInstanciaOrigen">
              <Form.Label>Nombre Instancia:</Form.Label>
              <Form.Control type="text" placeholder="Instancia" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBaseOrigen">
              <Form.Label>Nombre Base de Datos:</Form.Label>
              <Form.Control type="text" placeholder="Base de Datos" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPuertoOrigen">
              <Form.Label>Puerto:</Form.Label>
              <Form.Control type="text" placeholder="Puerto" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsuarioOrigen">
              <Form.Label>Nombre Usuario:</Form.Label>
              <Form.Control type="text" placeholder="Usuario" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPasswordOrigen">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Probar
            </Button>
          </div>

          <div className="form-column">
            <h3>Base de Datos de Destino</h3>
            <Form.Group className="mb-3" controlId="formInstanciaDestino">
              <Form.Label>Nombre Instancia:</Form.Label>
              <Form.Control type="text" placeholder="Instancia" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBaseDestino">
              <Form.Label>Nombre Base de Datos:</Form.Label>
              <Form.Control type="text" placeholder="Base de Datos" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPuertoDestino">
              <Form.Label>Puerto:</Form.Label>
              <Form.Control type="text" placeholder="Puerto" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsuarioDestino">
              <Form.Label>Nombre Usuario:</Form.Label>
              <Form.Control type="text" placeholder="Usuario" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPasswordDestino">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit">
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
