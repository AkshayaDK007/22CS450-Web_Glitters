import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const initialStudent = {
    Name: '',
    Staff: '',
    PresentStatus: '',
    ClassHour: ''
};

const url = '/api/attendance'; // Adjust the API endpoint for student attendance

const defaultStudentTexts = {
  header: 'Create Student Attendance',
  alert: 'Attendance recorded successfully',
  showAlert: false,
  variant: 'success'
};

const updateStudentTexts = {
  header: 'Update Student Attendance',
  alert: 'Attendance updated successfully',
  showAlert: false,
  variant: 'success'
};

function AttendanceForm() {
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState(initialStudent);
  const [studentText, setStudentText] = useState(defaultStudentTexts);
  const navigate = useNavigate();

  const fetchStudent = () => {
    if (id) {
      setStudentText(updateStudentTexts);
      fetch(`${url}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setStudentInfo(data.payload[0] || initialStudent);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let methodName = 'POST';
    let studentData = JSON.stringify({
        Name: studentInfo.Name,
        Staff: studentInfo.Staff,
        PresentStatus: studentInfo.PresentStatus,
        ClassHour: studentInfo.ClassHour
    });
    let methodUrl = url;
    if (id) {
      methodName = 'PUT';
      methodUrl = `${methodUrl}/${id}`;
    }
    const options = {
      method: methodName,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: studentData
    };
    fetch(methodUrl, options)
      .then((doc) => {
        setStudentText({
          ...studentText,
          showAlert: true,
          variant: 'success'
        });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((e) => {
        setStudentText({
          ...studentText,
          showAlert: true,
          variant: 'danger'
        });
      });
  };

  useEffect(() => {
    fetchStudent();
}, [id, fetchStudent]);

const setValueForm = (newValue, propName) => {
  setStudentInfo((prevStudent) => ({
    ...prevStudent,
    [propName]: newValue
  }));
};


  return (
    <div className='container'>
      <div className='header-container'>
        <h1 className='mb-3 mt-5 text-center'>{studentText.header}</h1>
        <Link to='/'>
          <Button variant='primary'>Back</Button>
        </Link>
      </div>
      <div className='container form-container'>
        {studentText.showAlert && (
          <Alert variant={studentText.variant}>{studentText.alert}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='studentForm.Name'>
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='John Doe'
              value={studentInfo.Name}
              onChange={(e) => setValueForm(e.target.value,"Name")}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='studentForm.Staff'>
            <Form.Label>Staff</Form.Label>
            <Form.Control
              type='text'
              placeholder='Mr. Smith'
              value={studentInfo.Staff}
              onChange={(e) => setValueForm(e.target.value, 'Staff')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='studentForm.PresentStatus'>
            <Form.Label>Present Status</Form.Label>
            <Form.Control
              type='text'
              placeholder='Present'
              value={studentInfo.PresentStatus}
              onChange={(e) => setValueForm(e.target.value, 'PresentStatus')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='studentForm.ClassHour'>
            <Form.Label>Class Hour</Form.Label>
            <Form.Control
              type='number'
              placeholder='1'
              value={studentInfo.ClassHour}
              onChange={(e) => setValueForm(e.target.value, 'ClassHour')}
            />
          </Form.Group>
          <Button type='submit' variant='primary' className='text-right'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AttendanceForm;
