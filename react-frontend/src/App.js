import React from 'react';
import StudentList from './StudentList';
import AddStudentForm from './AddStudentForm';

const App = () => {
    let nombre = "Juan";
    return (
        <div className="App">
            <h1>Gestión de Estudiantes</h1>
            <AddStudentForm /> {/* Formulario para agregar estudiantes */}
            <StudentList nombre={nombre} /> {/* Lista de estudiantes */}
        </div>
    );
};

export default App;
