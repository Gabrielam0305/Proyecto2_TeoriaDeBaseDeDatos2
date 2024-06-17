import React from "react";
import "./App.css";
import Login from "./Screen/login/login";
import Info from "./Screen/Info/Info";
import Lista from "./Lista";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="general">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/info" element={<Info />} />
          <Route path="/lista" element={<Lista />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
