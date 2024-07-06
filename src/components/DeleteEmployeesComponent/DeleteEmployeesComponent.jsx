import React, { useState } from 'react';
import './DeleteEmployeesComponent.css';
import axios from 'axios';

const DeleteEmployeesComponent = () => {
  const [employeeID, setEmployeeID] = useState('')
  const [employeeInfo, setEmployeeInfo] = useState({
    employeeName: '',
    employeeEmail: '',
    dateOfBirth: '',
  });

  const employeeIDHandler = (event) => {
    setEmployeeID(event.target.value)
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
      .delete(`http://localhost:8082/api/v1/employee/${employeeID}`)
      .then(response => {
        if (response.status == 200)
        {
          alert(`Data of ${employeeInfo.employeeName} is deleted successfully`)
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
      <h2>Deleting Employee</h2>

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
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Employee Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the employee email"
          value={employeeEmail}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          value={dateOfBirth}
          readOnly
        />
      </div>

      <div>
        <button type="submit">Delete</button>
      </div>
    </form>
  );
};

export default DeleteEmployeesComponent;
