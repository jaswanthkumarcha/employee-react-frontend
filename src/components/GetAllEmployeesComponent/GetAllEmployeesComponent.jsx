import React, { useState, useEffect } from 'react'
import BookComponent from './EmployeeComponent'
import './GetAllEmployeesComponent.css'
import axios from 'axios'

const GetAllEmployeesComponent = () => {

    const [employees, setEmployees] = useState([])

    

    useEffect(() => {
        axios
          .get(`http://localhost:8082/api/v1/employee/`)
          .then(response => setEmployees(response.data))
          .catch(error => {
            alert(`Status ${error.response.data.status} - ${error.response.data.message}`)
          })
    }, [])

  return (
    <div className='employees'>
        {employees.map((employee, index)=>(
            <BookComponent key={index} employee={employee}/>
        ))}
    </div>
  )
}

export default GetAllEmployeesComponent