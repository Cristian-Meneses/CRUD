import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";
import "./Register.css"; // Archivo CSS para estilos
import Swal from "sweetalert2";

function Register() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await addDoc(collection(db, "users"), {
        name: form.name,
        age: Number(form.age),
        phone: form.phone,
        email: form.email,
        uid: userCredential.user.uid,
      });

      // Mostrar alerta de éxito
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registro exitoso",
        showConfirmButton: false,
        timer: 1500,
      });

      // Opcional: Limpiar el formulario
      setForm({ name: "", age: "", phone: "", email: "", password: "" });
    } catch (error) {
      // Mostrar alerta de error
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al registrar",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Edad"
          onChange={handleChange}
          value={form.age}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          onChange={handleChange}
          value={form.phone}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={form.password}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      <div className="login-link">
        <p>¿Ya tienes una cuenta?</p>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
