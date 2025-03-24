import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent, setSelectedStudent } from "../redux/slices/studentSlice";

const StudentList = () => {
    const dispatch = useDispatch();
    const { students, loading } = useSelector((state) => state.student);

    // Fetch students on component mount
    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    if (loading) return <p>Loading students...</p>;

    return (
        <div className="container mt-4">
            <h2>Student List</h2>
            <div className="row">
                {students.length === 0 ? (
                    <p>No students found.</p>
                ) : (
                    students.map((student) => (
                        <div className="col-md-4 mb-3" key={student.id}>
                            <div className="card h-100">
                                {/* Display Student Image */}
                                <img
                                    src={student.imageUrl ? `https://localhost:7272${student.imageUrl}` : "https://via.placeholder.com/200"}
                                    className="card-img-top"
                                    alt="Student"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{student.name}</h5>
                                    <p className="card-text"><strong>Email:</strong> {student.email}</p>
                                    <p className="card-text"><strong>Address:</strong> {student.address}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    {/* Edit Button */}
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => dispatch(setSelectedStudent(student))}
                                    >
                                        Edit <i className="bi bi-pencil-square"></i>
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this student?")) {
                                                dispatch(deleteStudent(student.id));
                                            }
                                        }}
                                    >
                                        Delete <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StudentList;
