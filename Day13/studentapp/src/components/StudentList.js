import React, { useEffect, useState } from 'react';
import StudentService from '../services/StudentService';

const StudentList = ({ setEditMode, setSelectedStudent, refreshStudents }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        refreshStudentList();
    }, []);

    const refreshStudentList = () => {
        StudentService.getAllStudents().then((response) => {
            setStudents(response.data);
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            StudentService.deleteStudent(id).then(() => {
                alert('Student deleted successfully!');
                refreshStudentList();
            });
        }
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setEditMode(true);
    };

    return (
        <div className="container mt-4">
            <h2>Student List</h2>
            <div className="row">
                {students.map((student) => (
                    <div className="col-md-4 mb-3" key={student.id}>
                        <div className="card h-100">
                            <img
                                src={student.imageUrl ? `https://localhost:7272${student.imageUrl}` : ''}
                                className="card-img-top"
                                alt="Student"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{student.name}</h5>
                                <p className="card-text">{student.email}</p>
                                <p className="card-text">{student.address}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button className="btn btn-warning" onClick={() => handleEdit(student)}>
                                    Edit <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>
                                    Delete <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentList;



