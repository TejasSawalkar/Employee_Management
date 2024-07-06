import React, { useState, useEffect } from "react";

function CustomizedTables() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7058/api/employee")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  

  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>Id  </th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.middleName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.employeeType}</td>
              <td><button >Edit</button></td>
              <td><button >Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomizedTables;
