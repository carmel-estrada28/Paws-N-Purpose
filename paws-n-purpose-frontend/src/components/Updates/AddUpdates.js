// components/Updates/AddUpdates.js
import React, { useState } from 'react';
import Button from '../Buttons/Button';
import FormInput from '../FormInput/FormInput';
import './AddUpdates.css';

export default function AddUpdates({ isOpen, onClose, onSave }) {
  const [updateContent, setUpdateContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!updateContent.trim()) {
      alert('Please enter update content');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      onSave(updateContent);
      setUpdateContent('');
    } catch (error) {
      console.error('Error saving update:', error);
      alert('Failed to save update');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="add-updates-modal-overlay" 
      onClick={handleOverlayClick}
    >
      <div 
        className="add-updates-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">Add New Update</h2>
          <p className="modal-subtitle">
            Share the latest progress or news about this donation box
          </p>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#053534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="#053534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label className="form-label">Update Content *</label>
            <FormInput
              placeholder="What's new with this donation box? Share progress, news, or thank donors..."
              type="textarea"
              value={updateContent}
              onChange={(e) => setUpdateContent(e.target.value)}
              rows="6"
              required
            />
            <p className="char-count">{updateContent.length}/1000 characters</p>
          </div>

          <div className="modal-actions">
            <Button
              type="submit"
              text={isSubmitting ? "Posting..." : "Post Update"}
              theme="pink semi-rounded"
              hPadding={2}
              vPadding={0.75}
              isLoading={isSubmitting}
              disabled={isSubmitting}
            />
            <Button
              type="button"
              text="Cancel"
              theme="outline semi-rounded"
              hPadding={2}
              vPadding={0.75}
              onClick={onClose}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}