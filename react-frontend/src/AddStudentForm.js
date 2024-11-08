import { useState } from 'react';
import axios from 'axios';

const AddStudentForm = ({ onAddStudent }) => {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/students', {
                name: name,
                grade: parseFloat(grade)
            });

            // Llamar a la función onAddStudent para actualizar la lista de estudiantes
            onAddStudent(response.data);  // Agregar el nuevo estudiante a la lista

            setMessage("Estudiante agregado exitosamente");
            setName('');
            setGrade('');            
        } catch (err) {
            setMessage(`Error al agregar estudiante: ${err.response ? err.response.data.message : "Intente nuevamente más tarde"}`);
        }
    };

    return (
        <div className="container mt-5 w-50">
            <h2 className="text-center mb-4">Agregar Nuevo Estudiante</h2>
            {message && (
                <div className={`alert ${message.includes('exitosamente') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-light p-4 border rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="grade" className="form-label">Nota:</label>
                    <input
                        type="number"
                        id="grade"
                        step="0.1"
                        className="form-control"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-primary w-100" type="submit">Guardar Estudiante</button>
            </form>
        </div>
    );
};
export default AddStudentForm;
