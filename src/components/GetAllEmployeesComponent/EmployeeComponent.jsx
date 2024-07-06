import React from 'react'

const EmployeeComponent = ({employee}) => {
return (
        <div className="card">
          <div className="text-container">
            <h3>{employee.employeeName}</h3>
            <p className="id">({employee.employeeID})</p>
            <p className='email'>{employee.employeeEmail}</p>
            <p className='age'>Age : {employee.employeeAge}</p>
          </div>
        </div>
      );
}

export default EmployeeComponent