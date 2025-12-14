import React from 'react';
import Button from '../Buttons/Button';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Discard', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay" onClick={onClose}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-modal-content">
          <h3 className="confirmation-modal-title">{title}</h3>
          <p className="confirmation-modal-message">{message}</p>
          <div className="confirmation-modal-actions">
            <Button 
              theme="secondary-button"
              text={cancelText}
              onClick={onClose}
              hPadding={1.5}
              vPadding={0.5}
            />
            <Button 
              theme="primary-button"
              text={confirmText}
              onClick={onConfirm}
              hPadding={1.5}
              vPadding={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
