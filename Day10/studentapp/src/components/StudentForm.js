import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';

const StudentForm = ({ selectedStudent, setEditMode, refreshStudents }) => {
    const [student, setStudent] = useState({ name: '', email: '', address: '' });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (selectedStudent) {
            setStudent(selectedStudent);
        }
    }, [selectedStudent]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', student.name);
        formData.append('email', student.email);
        formData.append('address', student.address);
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        if (selectedStudent) {
            StudentService.updateStudent(selectedStudent.id, formData).then(() => {
                alert('Student updated successfully!');
                refreshStudents();
                setEditMode(false);
            });
        } else {
            StudentService.createStudent(formData).then(() => {
                alert('Student created successfully!');
                refreshStudents();
            });
        }

        setStudent({ name: '', email: '', address: '' });
        setImageFile(null);
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded bg-light">
            <h2>{selectedStudent ? 'Edit Student' : 'Add Student'}</h2>
            <div className="form-group mb-3">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={student.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group mb-3">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={student.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group mb-3">
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={student.address}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group mb-3">
                <label>Image</label>
                <input type="file" className="form-control" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary">
                {selectedStudent ? 'Update Student' : 'Add Student'}{' '}
                <i className="bi bi-person-plus"></i>
            </button>
            {selectedStudent && (
                <button type="button" className="btn btn-secondary ms-3" onClick={() => setEditMode(false)}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default StudentForm;
