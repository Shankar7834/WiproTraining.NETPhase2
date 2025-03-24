import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent, setSelectedStudent, fetchStudents } from "../redux/slices/studentSlice";

const StudentForm = () => {
    const dispatch = useDispatch();
    const { selectedStudent } = useSelector((state) => state.student);

    // Form state
    const [student, setStudent] = useState({ name: "", email: "", address: "", imageUrl: "" });
    const [imageFile, setImageFile] = useState(null);

    // Populate form if editing
    useEffect(() => {
        if (selectedStudent) {
            setStudent({
                name: selectedStudent.name,
                email: selectedStudent.email,
                address: selectedStudent.address,
                imageUrl: selectedStudent.imageUrl
            });
        } else {
            setStudent({ name: "", email: "", address: "", imageUrl: "" });
        }
    }, [selectedStudent]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", student.name);
        formData.append("email", student.email);
        formData.append("address", student.address);

        if (imageFile) {
            formData.append("imageFile", imageFile);
        }

        if (selectedStudent) {
            await dispatch(updateStudent({ id: selectedStudent.id, formData }));
            alert("Student updated successfully!");
        } else {
            await dispatch(addStudent(formData));
            alert("Student added successfully!");
        }

        // Reset form & refresh students
        setStudent({ name: "", email: "", address: "", imageUrl: "" });
        setImageFile(null);
        dispatch(setSelectedStudent(null));
        dispatch(fetchStudents());
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded bg-light">
            <h2>{selectedStudent ? "Edit Student" : "Add Student"}</h2>
            <div className="form-group mb-3">
                <label>Name</label>
                <input type="text" name="name" className="form-control" value={student.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group mb-3">
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={student.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group mb-3">
                <label>Address</label>
                <input type="text" name="address" className="form-control" value={student.address} onChange={handleInputChange} required />
            </div>
            <div className="form-group mb-3">
                <label>Image</label>
                <input type="file" className="form-control" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary">
                {selectedStudent ? "Update Student" : "Add Student"}
            </button>
        </form>
    );
};

export default StudentForm;
