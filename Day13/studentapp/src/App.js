import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Login from './components/Login';
import Register from './components/Register';
import AuthService from './services/AuthService';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [authUser, setAuthUser] = useState(AuthService.getCurrentUser());

  const refreshStudents = () => {
    setSelectedStudent(null);
    setEditMode(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    setAuthUser(null);
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Student Portal</Link>
          <div className="navbar-nav ml-auto">
            {!authUser ? (
              <>
                <Link className="nav-item nav-link" to="/login">Login</Link>
                <Link className="nav-item nav-link" to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link className="nav-item nav-link" to="/students">Students</Link>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/students" element={authUser ? (
            <>
              <StudentForm selectedStudent={selectedStudent} setEditMode={setEditMode} refreshStudents={refreshStudents} />
              <StudentList setSelectedStudent={setSelectedStudent} setEditMode={setEditMode} refreshStudents={refreshStudents} />
            </>
          ) : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;











