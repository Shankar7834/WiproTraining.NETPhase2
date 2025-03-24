
import { useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const refreshStudents=()=>
  {
    setSelectedStudent(null);
    setEditMode(false);
  }

  return (
  
    <>
      <h1>Student portal form </h1>
      <StudentForm selectedStudent={selectedStudent} setEditMode={setEditMode} refreshStudents={refreshStudents} />
      <StudentList setSelectedStudent={setSelectedStudent} setEditMode={setEditMode} refreshStudents={refreshStudents} />
    </>
  );
}

export default App;
