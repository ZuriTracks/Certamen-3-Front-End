import React, { useState, useEffect } from 'react';
import './App.css';

function getInitialData() {
  return JSON.parse(localStorage.getItem('evaluaciones')) || [];
}

function App() {
  const [evaluaciones, setEvaluaciones] = useState(getInitialData());
  const [form, setForm] = useState({ nombre: '', asignatura: '', promedio: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
  }, [evaluaciones]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.asignatura.trim() || form.promedio === '') return;
    const promedioNum = parseFloat(form.promedio);
    if (isNaN(promedioNum) || promedioNum < 0 || promedioNum > 7) return;

    if (editId !== null) {
      setEvaluaciones(evaluaciones.map(ev =>
        ev.id === editId ? { ...ev, ...form, promedio: promedioNum } : ev
      ));
      setEditId(null);
    } else {
      setEvaluaciones([
        ...evaluaciones,
        { id: Date.now(), ...form, promedio: promedioNum }
      ]);
    }
    setForm({ nombre: '', asignatura: '', promedio: '' });
  };

  const handleEdit = (ev) => {
    setForm({ nombre: ev.nombre, asignatura: ev.asignatura, promedio: ev.promedio });
    setEditId(ev.id);
  };

  const handleDelete = (id) => {
    setEvaluaciones(evaluaciones.filter(ev => ev.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div>
      <h2>Evaluación de Alumnos</h2>
      <form id="studentform" onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Alumno:</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
          />
        </div>
        <div>
          <label>Asignatura:</label>
          <input
            type="text"
            name="asignatura"
            value={form.asignatura}
            onChange={handleChange}
            placeholder="Ej: Matemáticas"
          />
        </div>
        <div>
          <label>Promedio (0.0 - 7.0):</label>
          <input
            type="number"
            name="promedio"
            value={form.promedio}
            onChange={handleChange}
            placeholder="Ej: 5.5"
            min="0"
            max="7"
            step="0.1"
          />
        </div>
        <button
          type="submit"
          disabled={!form.nombre.trim() || !form.asignatura.trim() || form.promedio === ''}
        >
          {editId !== null ? "Actualizar Evaluación" : "Agregar Evaluación"}
        </button>
      </form>

      <h2>Evaluaciones Guardadas</h2>
      <div>
        {evaluaciones.length === 0 && (
          <p style={{ textAlign: "center", color: "#00ff88" }}>No hay evaluaciones guardadas.</p>
        )}
        <table id="studentstable">
          <thead>
            <tr>
              <th>Datos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map(ev => (
              <tr key={ev.id}>
                <td>
                  <strong>Alumno:</strong> {ev.nombre}<br />
                  <strong>Asignatura:</strong> {ev.asignatura}<br />
                  <strong>Promedio:</strong> {ev.promedio}
                  {parseFloat(ev.promedio) === 7 &&
                    <span style={{
                      marginLeft: "1rem",
                      background: "#00ff88",
                      color: "#1a1a2e",
                      borderRadius: "6px",
                      padding: "0.2rem 0.7rem",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      marginTop: "0.5rem",
                      display: "inline-block"
                    }}>Destacado</span>
                  }
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(ev)}
                  >Editar</button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(ev.id)}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
