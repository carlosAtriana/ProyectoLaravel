import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = ({nombre}) => {
    console.log("lo que viene de papa", nombre)
    const [students, setStudents] = useState([]); // Estado para almacenar los estudiantes
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        // Función para obtener los datos de estudiantes
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/students');
                setStudents(response.data); // Guardar los datos en el estado
            } catch (err) {
                setError("Error al obtener los datos de estudiantes"); // Guardar el error en el estado
            }
        };

        fetchStudents(); // Llamar a la función para obtener los datos
    }, [students]);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1 className="clase1">Lista de Estudiantes</h1>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.name} - {student.age} años - Nota: {student.grade}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
