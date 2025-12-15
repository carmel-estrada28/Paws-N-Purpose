// components/Updates/AddUpdates.js
import React, { useState } from 'react';
import Button from '../Buttons/Button';
import FormInput from '../FormInput/FormInput';
import './AddUpdates.css';

export default function AddUpdates({ isOpen, onClose, onSave }) {
  const [updateContent, setUpdateContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
      onSave({ content: updateContent, image: imagePreview });
      setUpdateContent('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving update:', error);
      alert('Failed to save update');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
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
            <FormInput
              placeholder="Share the latest news about this campaign..."
              type="textarea"
              value={updateContent}
              onChange={(e) => setUpdateContent(e.target.value)}
              rows="6"
              required
            />
          </div>
          {/* Image upload section */}
          <div className="image-upload-section" style={{ margin: '10px 0' }}>
            <label htmlFor="update-image-upload" className="image-upload-label" style={{ color: '#DD4391', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16.5 13.5L13.5 10.5L7.5 16.5" stroke="#DD4391" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19Z" stroke="#DD4391" strokeWidth="2"/></svg>
              Upload Images
              <input id="update-image-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
            </label>
            {imagePreview && (
              <div className="image-preview" style={{ marginTop: 8 }}>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 8 }} />
              </div>
            )}
          </div>
          <div className="modal-actions">
            <Button
              type="submit"
              text={isSubmitting ? "Posting..." : "Add Update"}
              theme="pink semi-rounded"
              hPadding={2}
              vPadding={0.75}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              style={{ width: '100%', fontWeight: 600, fontSize: '1rem' }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}