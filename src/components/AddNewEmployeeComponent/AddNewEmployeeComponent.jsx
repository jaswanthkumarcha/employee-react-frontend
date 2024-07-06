import React, { useState } from 'react';
import './AddNewEmployeeComponent.css';
import axios from 'axios';

const AddNewEmployeeComponent = () => {
  const [employeeInfo, setEmployeeInfo] = useState({
    employeeName: '',
    employeeEmail: '',
    dateOfBirth: '',
  });

  const employeeNameHandler = (event) => {
    setEmployeeInfo({
      ...employeeInfo,
      employeeName: event.target.value,
    });
  };

  const employeeEmailHandler = (event) => {
    setEmployeeInfo({
      ...employeeInfo,
      employeeEmail: event.target.value,
    });
  };


  const dateOfBirthHandler = (event) => {
    setEmployeeInfo({
      ...employeeInfo,
      dateOfBirth: event.target.value,
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:8082/api/v1/employee/`,employeeInfo)
      .then(response => {
        if (response.status == 200)
        {
          alert(`Data of ${employeeInfo.employeeName} is added successfully`)
          window.location.href='/'
        }
      })
      .catch(error => {
        alert(`Status ${error.response.data.status} - ${error.response.data.message}`)
      })
  };

  const { employeeName, employeeEmail, dateOfBirth } = employeeInfo;

  return (
    <form className='form-container' onSubmit={formSubmitHandler}>
      <h2>Adding a new employee</h2>

      <div className='form-group'>
        <label>Employee Name</label>
        <input
          type='text'
          placeholder='Enter the employee name'
          value={employeeName}
          onChange={employeeNameHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>Employee Email</label>
        <input
          type='text'
          className='form-control'
          placeholder='Enter the employee email'
          value={employeeEmail}
          onChange={employeeEmailHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>Date Of Birth</label>
        <input
          type='date'
          value={dateOfBirth}
          onChange={dateOfBirthHandler}
          required
        />
      </div>

      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

export default AddNewEmployeeComponent;
