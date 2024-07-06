import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmPage({ show, onAccept, onReject,onClose ,status }) {
    const [isApprove, setIsApprove] = useState(false);
    const [isReject, setIsReject] = useState(false);
    const navigate=useNavigate();
    
    useEffect(() => {
        if (status === 'approve') {
            setIsApprove(true);
            setIsReject(false);
        } else if (status === 'reject') {
            setIsApprove(false);
            setIsReject(true);
        }
    }, [status]);

    if (!show) {
        return null;
    }

   
    

    return (
        <div className="modal-overlay">
            {isApprove && (
                <div className="modal">
                    <h2>Confirm Accept</h2>
                    <p>Accept Request</p>
                    <button onClick={onAccept}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            )}
            {isReject && (
                <div className="modal">
                    <h2>Confirm Deletion</h2>
                    <p>Reject Request</p>
                    <button onClick={onReject}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            )}
        </div>
    );
}
