import React from 'react';

const Input = ({ label, ...props }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input className="input" {...props} />
    </div>
  );
};

export default Input;