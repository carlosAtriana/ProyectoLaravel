import React, { useState } from 'react';
import axios from 'axios';

const AddStudentForm = () => {
    // Definir el estado para los campos del formulario
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [grade, setGrade] = useState('');
    const [message, setMessage] = useState(''); // Estado para mostrar mensajes de éxito o error

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir la recarga de la página

        try {
            // Hacer la solicitud POST a la API
            const response = await axios.post('http://127.0.0.1:8000/api/students', {
                name: name,
                grade: parseFloat(grade)
            });

            setMessage("Estudiante agregado exitosamente"); // Mensaje de éxito
            setName(''); // Limpiar campos después de enviar
            setGrade('');
        } catch (err) {
            setMessage("Error al agregar estudiante"); // Mensaje de error
        }
    };

    return (
        <div>
            <h2>Agregar Nuevo Estudiante</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nota:</label>
                    <input
                        type="number"
                        step="0.1"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Guardar Estudiante</button>
            </form>
        </div>
    );
};

export default AddStudentForm;
