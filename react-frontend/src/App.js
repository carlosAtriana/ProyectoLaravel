import { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudentForm from './AddStudentForm';
import StudentList from './StudentList';

const App = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    // Función para obtener la lista de estudiantes
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/students');
            setStudents(response.data);
        } catch (err) {
            setError(`Error al obtener los datos de estudiantes: ${err.message}`);
        }
    };

    // Llamar a la función para obtener los estudiantes cuando el componente se monte
    useEffect(() => {
        fetchStudents();
    }, []); // Este effect solo se ejecuta una vez al montar el componente

    // Función que se pasa a AddStudentForm para actualizar el estado local de students
    const handleAddStudent = (newStudent) => {
        setStudents((prevStudents) => [...prevStudents, newStudent]);  // Agregar el nuevo estudiante a la lista
    };

    return (
        <div className="App">
            <h1>Gestión de Estudiantes</h1>
            <AddStudentForm onAddStudent={handleAddStudent} /> {/* Formulario para agregar estudiantes */}
            <StudentList students={students} /> {/* Lista de estudiantes */}
        </div>
    );
};

export default App;
