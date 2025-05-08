import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './Login.css'; // Asegúrate de que Login.css tenga los estilos aislados a este componente.

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Inicio de sesión con Firebase
      await signInWithEmailAndPassword(auth, form.email, form.password);
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "¡Bienvenido de nuevo!",
      });
      navigate("/dashboard"); // Redirige al usuario al CRUD después del login
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario no encontrado. Verifica el correo.",
        });
      } else if (error.code === "auth/wrong-password") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Contraseña incorrecta. Intenta de nuevo.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al iniciar sesión: ${error.message}`,
        });
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
