import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteModal from '../components/DeleteStudent';
import { Link } from 'react-router-dom';

const url = '/api/attendance'; // Adjust the API endpoint for student attendance

const AttendanceTile = ({ attendance, onDeleteClick }) => (
  <Card className="attendance-tile mb-3">
    <Card.Body>
      <Card.Title>{attendance.Name}</Card.Title>
      <Card.Text>
        <p>Staff: {attendance.Staff}</p>
        <p>Present Status: {attendance.PresentStatus}</p>
        <p>Class Hour: {attendance.ClassHour}</p>
      </Card.Text>
      
      <Link to={`/edit/${attendance._id}`}>
        <FaEdit className="ml-2" />
      </Link>
      
      <FaTrash className="ml-2" onClick={() => onDeleteClick(attendance._id)} />
    </Card.Body>
  </Card>
);

function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState({});


  const fetchAttendance = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendanceList(data.payload);
      })
      .catch(() => {
        setAttendanceList([]);
      });
  };



  const deleteAttendance = (id) => {
    fetch(`${url}/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchAttendance();
        setShowDeleteModal(false);
      })
      .catch(() => {});
  };

  const handleDeleteAttendanceClick = (id) => {
    setShowDeleteModal(true);
    setSelectedAttendance({ _id: id });
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className='container'>
      <div className='header-container'>
        <h1 className='mb-3 mt-5'>Attendance List</h1>
        <Link to='/add'>
          <Button variant='primary'>Create Attendance</Button>
        </Link>
      </div>



      <div className="attendance-list">
  {attendanceList.length > 0 ? (
    attendanceList.map((attendance) => (
      <AttendanceTile key={attendance._id} attendance={attendance} onDeleteClick={handleDeleteAttendanceClick} />
    ))
  ) : (
    <p id="no">No such attendance found. Please recheck !!</p>
  )}
</div>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        studentName={selectedAttendance.Name}
        studentId={selectedAttendance._id}
        deleteStudent={() => deleteAttendance(selectedAttendance._id)}
      />
    </div>
  );
}

export default Attendance;
