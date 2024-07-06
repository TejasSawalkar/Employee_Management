import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequestLeaves() {
    const [requests, setRequests] = useState([]);
    const [empDetails, setEmpDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getEmpDetails() {
            try {
                const response = await axios.get('https://localhost:7058/api/Employee');
                setEmpDetails(response.data);
            } catch (error) {
                console.log("Error=", error);
            }
        }
        getEmpDetails();
    }, [])

    useEffect(() => {
        async function getRequests() {
            try {
                const response = await axios.get('https://localhost:7058/api/leaveRequests')
                setRequests(response.data);
            } catch (error) {
                console.log("Error=", error);
            }
        }
        getRequests();
    }, [])

    const handleRowClick = (reqId, empId) => {
       navigate(`/leaveDetails/${reqId}/${empId}`);
    }

    return (
        <div>
            <h1>Leave Requests</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Reason</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req, index) => {
                            const employee = empDetails.find(emp => emp.id === req.employeeId);
                            return (
                                <tr key={index} onClick={() => handleRowClick(req.leaveRequestId, employee.id)} style={{ cursor: 'pointer' }}>
                                    <td>{employee ? employee.firstName : "Unknown"}</td>
                                    <td>{employee ? employee.email : "Unknown"}</td>
                                    <td>{req.reason}</td>
                                    <td>{req.startDate}</td>
                                    <td>{req.endDate}</td>
                                    <td>{req.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
