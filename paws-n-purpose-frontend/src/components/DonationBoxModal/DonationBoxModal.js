import { useState, useRef } from 'react';
import Button from '../Buttons/Button';
import FormInput from '../FormInput/FormInput';
import './DonationBoxModal.css';

const DonationBoxModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    condition: '',
    goalAmount: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    if (!formData.name || formData.name.trim() === '') {
      alert('Please enter a name/nickname');
      return;
    }
    
    if (!formData.condition || formData.condition.trim() === '') {
      alert('Please enter a condition/description');
      return;
    }
    
    if (!formData.goalAmount || parseFloat(formData.goalAmount) <= 0) {
      alert('Please enter a valid goal amount');
      return;
    }

    const donationBox = {
      id: Date.now(),
      name: formData.name,
      condition: formData.condition,
      goalAmount: formData.goalAmount,
      image: selectedImage,
      dateAdded: new Date().toISOString()
    };

    onSave(donationBox);
    
    setFormData({
      name: '',
      condition: '',
      goalAmount: '',
    });
    setSelectedImage(null);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      condition: '',
      goalAmount: '',
    });
    setSelectedImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="donation-box-modal-overlay">
      <div className="donation-box-modal">
        <div className="modal-header">
          <h2 className="modal-title">Make A Donation Box!</h2>
          <p className="modal-subtitle">
            Provide your animal's information to make a donation box!
          </p>
        </div>

        <div className="modal-content">
          {/* Add Photo */}
          <div className="photo-upload-section">
            <div 
              className={`photo-upload-area ${selectedImage ? 'has-image' : ''}`}
              onClick={handleAddPhotoClick}
            >
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Animal" 
                  className="uploaded-image"
                />
              ) : (
                <>
                  <p className="photo-text">Add Animal Photo</p>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="file-input"
              style={{ display: 'none' }}
            />
          </div>

          {/* Form Fields*/}
          <div className="modal-form">
            {/* Name - text input */}
            <div className="form-group">
              <label className="form-label required">Name / Nickname</label>
              <FormInput
                placeholder="Enter name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>

            {/*textarea (same FormInput component, different type) */}
            <div className="form-group">
              <label className="form-label required">Condition / Description</label>
              <FormInput
                placeholder="Enter condition or description"
                type="textarea"
                value={formData.condition}
                onChange={(e) => handleInputChange('condition', e.target.value)}
                rows="4"
              />
            </div>

            {/* Goal Amount*/}
            <div className="form-group">
              <label className="form-label required">Goal Amount (₱)</label>
              <FormInput
                placeholder="Enter amount"
                type="number"
                value={formData.goalAmount}
                onChange={(e) => handleInputChange('goalAmount', e.target.value)}
              />
            </div>
          </div>

          {}
          <div className="modal-actions">
            <Button
              type="button"
              text="Save"
              theme="pink semi-rounded"
              hPadding={2}
              vPadding={0.75}
              onClick={handleSave}
            />
            <Button
              type="button"
              text="Cancel"
              theme="outline semi-rounded"
              hPadding={2}
              vPadding={0.75}
              onClick={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationBoxModal;