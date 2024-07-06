import React, { useState } from 'react';
import './EditEmployeesComponent.css';
import axios from 'axios';

const EditEmployeesComponent = () => {
  const [employeeID, setEmployeeID] = useState('')
  const [employeeInfo, setEmployeeInfo] = useState({
    employeeName: '',
    employeeEmail: '',
    dateOfBirth: '',
  });

  const employeeNameHandler = (event) => {
    setEmployeeInfo({
      ...employeeInfo,
      employeeName: event.target.value
    });
  };

  const employeeEmailHandler = (event) => {
    setEmployeeInfo({
      ...employeeInfo,
      employeeEmail: event.target.value
    });
  };

  const employeeIDHandler = (event) => {
    setEmployeeID(event.target.value)
  };

  const dateOfBirthHandler = (event) => {
    setEmployeeInfo({
      ...employeeInfo,
      dateOfBirth: event.target.value
    });
  };

  const employeeIDValidator = (event) => {
    event.preventDefault()
    axios
      .get(`http://localhost:8082/api/v1/employee/${employeeID}`)
      .then(response => setEmployeeInfo(response.data))
      .catch(error => {
        alert(`Status ${error.response.data.status} - ${error.response.data.message}`)
      })
    
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8082/api/v1/employee/${employeeID}`, employeeInfo)
      .then(response => {
        if (response.status == 200)
        {
          alert(`Data of ${employeeInfo.employeeName} is updated successfully`)
          window.location.href="/"
        }
      })
      .catch(error => {
        alert(`Status ${error.response.data.status} - ${error.response.data.message}`)
      })
  };

  const { employeeName, employeeEmail, dateOfBirth } = employeeInfo;

  return (
    <form className="form-container" onSubmit={formSubmitHandler}>
      <h2>Updating Employee</h2>

      <div className="form-group">
        <label>Employee ID</label>
        <input
          type="text"
          placeholder="Give the Employee ID"
          value={employeeID}
          onChange={employeeIDHandler}
          required
        />
      </div>
      <div>
        <button onClick={employeeIDValidator}>Check</button>
      </div>

      <div className="form-group">
        <label>Employee Name</label>
        <input
          type="text"
          placeholder="Enter the employee name"
          value={employeeName}
          onChange={employeeNameHandler}
          required
        />
      </div>

      <div className="form-group">
        <label>Employee Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the employee email"
          value={employeeEmail}
          onChange={employeeEmailHandler}
          required
        />
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={dateOfBirthHandler}
          required
        />
      </div>

      <div>
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default EditEmployeesComponent;
