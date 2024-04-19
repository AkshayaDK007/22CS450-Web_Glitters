// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Attendance from './components/Student';
import AttendanceForm from './components/StudentList';
import DeleteModal from './components/DeleteStudent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Attendance />} />
        <Route path="/edit" element={<AttendanceForm />} />
        <Route path="/edit/:id" element={<AttendanceForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;
