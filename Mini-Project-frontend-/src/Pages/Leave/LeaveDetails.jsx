import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmPage from "./ConfirmPage";

export default function LeaveDetails() {
    const { reqId, empId } = useParams();
    const [emp, setEmp] = useState(null);
    const [req, setReq] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalStatus, setModalStatus] = useState("");

    useEffect(() => {
        async function getEmp() {
            try {
                const response = await axios.get(`https://localhost:7058/api/Employee/${empId}`);
                setEmp(response.data);
            } catch (error) {
                console.error("Error fetching employee details:", error);
            }
        }
        if (empId) {
            getEmp();
        }
    }, [empId]);

    useEffect(() => {
        async function getReq() {
            try {
                const response = await axios.get(`https://localhost:7058/api/leaveRequests/${reqId}`);
                setReq(response.data);
            } catch (error) {
                console.error("Error fetching leave request details:", error);
            }
        }
        if (reqId) {
            getReq();
        }
    }, [reqId]);

    async function handleApprove() {
        try {
            const updatedReq = { ...req, status: 'Approved' }; // Update the status in local state
            await axios.put(`https://localhost:7058/api/leaveRequests/${reqId}`, updatedReq);
            setReq(updatedReq); // Update state after successful API call
            setShowModal(false); // Close the modal after action
        } catch (error) {
            console.error("Error approving leave request:", error);
        }
    }

    async function handleReject() {
        try {
            const updatedReq = { ...req, status: 'Rejected' }; // Update the status in local state
            await axios.put(`https://localhost:7058/api/leaveRequests/${reqId}`, updatedReq);
            setReq(updatedReq); // Update state after successful API call
            setShowModal(false); // Close the modal after action
        } catch (error) {
            console.error("Error rejecting leave request:", error);
        }
    }

    function handleCancel() {
        navigate("/")
    }

    if (!emp || !req) {
        return <div>Loading...</div>; // Render a loading indicator while data is being fetched
    }

    function showModalForAction(status) {
        setModalStatus(status);
        setShowModal(true);
    }
    function close(){
        setShowModal(false);
    }

    return (
        <div>
            <h1>{emp.firstName} {emp.lastName}</h1>
            <h3>Leave Request</h3>
            <p>Subject: {req.reason}</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Salutation and the receiver’s name:</p>
            <p>Dear Mr./Mrs. [The receiver’s name]</p>
            <p>{req.description}</p>
            <p>Email: {emp.email}<br />
                During my absence, you can reach me via email. I will be grateful to you for considering the present leave of application.</p>
            <br />
            <p>
                Sincerely,<br />
                {emp.firstName} {emp.lastName}
            </p>
            
            <button onClick={() => showModalForAction("reject")}>Reject</button>
            <button onClick={handleCancel}>Cancel</button> 
            <button onClick={() => showModalForAction("approve")}>Approve</button>

            <ConfirmPage
                show={showModal}
                onAccept={handleApprove}
                onReject={handleReject}
                status={modalStatus}
                onClose={close}
            />
        </div>
    );
}
