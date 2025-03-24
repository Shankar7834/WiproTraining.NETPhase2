import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import Login from "./components/Login";
import Register from "./components/Register";
import { logoutUser } from "./redux/slices/authSlice";
import { setSelectedStudent } from "./redux/slices/studentSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Student Portal</Link>
      <div className="navbar-nav ml-auto">
        {!user ? (
          <>
            <Link className="nav-item nav-link" to="/login">Login</Link>
            <Link className="nav-item nav-link" to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link className="nav-item nav-link" to="/students">Students</Link>
            <button className="btn btn-danger" onClick={() => dispatch(logoutUser())}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const AppContent = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Function to handle selecting a student for editing
  const handleEdit = (student) => {
    dispatch(setSelectedStudent(student));
  };

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Redirect to students if already logged in */}
          <Route path="/" element={<Navigate to={user ? "/students" : "/login"} />} />
          <Route path="/login" element={user ? <Navigate to="/students" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/students" /> : <Register />} />

          {/* Student Dashboard (Protected Route) */}
          <Route path="/students" element={user ? (
            <>
              <StudentForm />
              <StudentList setEditMode={handleEdit} />
            </>
          ) : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
