import React from 'react';
import Button from '../Button/Button';

const Modal = ({ isOpen, onClose, title, children, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        <div>{children}</div>
        <div style={{ display: 'flex', gap: 'var(--md)', marginTop: 'var(--lg)' }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;