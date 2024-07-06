import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [numEmployees, setNumEmployees] = useState(0);

  useEffect(() => {
    async function fetchNumEmployees() {
      try {
        const response = await axios.get(
          "https://localhost:7058/api/Employee/count"
        );
        setNumEmployees(response.data.count);
      } catch (error) {
        console.error("Error fetching number of employees:", error);
      }
    }

    fetchNumEmployees();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Number of Employees: {numEmployees}</p>
    </div>
  );
};

export default Dashboard;
