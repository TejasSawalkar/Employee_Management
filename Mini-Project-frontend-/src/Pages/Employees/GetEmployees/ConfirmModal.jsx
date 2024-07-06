import React from 'react';

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Are you sure?</h2>
        <p> You want to delete this employee?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default ConfirmModal;