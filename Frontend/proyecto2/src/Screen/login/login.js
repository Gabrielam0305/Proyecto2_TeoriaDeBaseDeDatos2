import React from "react";
import "./login.css"; // Importa un archivo CSS para estilos específicos

function Login() {
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
      <button type="submit">Login</button>
    </div>
  );
}

export default Login;
