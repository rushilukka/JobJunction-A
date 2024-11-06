import React from 'react';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      {message}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default CustomAlert;
