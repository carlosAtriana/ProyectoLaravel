
const StudentList = ({students}) => {    
    return (
        <div className="container mt-5 w-50">
            <h1 className="text-center mb-4">Lista de Estudiantes</h1>
            {students.length > 0 ? (
                <ul className="list-group">
                    {students.map(student => (
                        <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="fw-bold">{student.name}</span> 
                            <span className="badge bg-primary rounded-pill">Nota: {student.grade}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-secondary">No hay estudiantes disponibles</p>
            )}
        </div>
    );
};

export default StudentList;
