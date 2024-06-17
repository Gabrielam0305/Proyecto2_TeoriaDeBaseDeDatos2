import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Importa un archivo CSS para estilos específicos

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes realizar la lógica de autenticación si es necesario

    // Redirigir a la ruta /info
    navigate("/info");
  };

  return (
    <div className="general">
      <h1>Login</h1>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
