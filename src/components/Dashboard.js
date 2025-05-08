import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./Dashboard.css";
import { useCallback } from "react";

function Dashboard() {
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });
  const [editingId, setEditingId] = useState(null); // ID del usuario en edición

  const usersCollectionRef = collection(db, "users"); // Colección "users"

  // Obtener usuarios desde Firestore
  const fetchUsers = useCallback(async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, [usersCollectionRef]);

  // Añadir un usuario
  const addUser = async () => {
    await addDoc(usersCollectionRef, newUser);
    fetchUsers();
    setNewUser({ name: "", age: "", phone: "", email: "" }); // Resetear formulario
  };

  // Actualizar un usuario
  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, newUser);
    fetchUsers();
    setEditingId(null); // Salir del modo edición
    setNewUser({ name: "", age: "", phone: "", email: "" }); // Resetear formulario
  };

  // Eliminar un usuario
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    fetchUsers();
  };

  // Efecto para cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="dashboard">
      <h1>Gestión de Usuarios</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Edad"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        {editingId ? (
          <button onClick={() => updateUser(editingId)}>Actualizar</button>
        ) : (
          <button onClick={addUser}>Agregar</button>
        )}
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>Edad: {user.age}</p>
            <p>Teléfono: {user.phone}</p>
            <p>Correo: {user.email}</p>
            <div className="actions">
              <button
                onClick={() => {
                  setNewUser(user);
                  setEditingId(user.id);
                }}
              >
                Editar
              </button>
              <button onClick={() => deleteUser(user.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
