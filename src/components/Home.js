import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Archivo CSS para estilos

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a Trabajo Base de Datos</h1>
      <p className="home-description">
        Esta aplicación te permite gestionar usuarios con registro y login seguro.
      </p>
      <div className="home-buttons">
        <Link to="/register">
          <button className="home-button">Registro</button>
        </Link>
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
