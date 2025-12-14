import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import Header from '../../components/Header/Header';
import './CreateDonationBox.css';

function CreateDonationBox() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    targetDate: '',
    photoFile: null,
    photoUrl: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setError('');
    setFormData(prev => ({
      ...prev,
      photoFile: file,
      photoUrl: ''
    }));

    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const removePhoto = (e) => {
    e.stopPropagation();
    setPhotoPreview(null);
    setFormData(prev => ({
      ...prev,
      photoFile: null,
      photoUrl: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Donation Box Data:', formData);
    navigate('/my-projects');
  };

  return (
    <div className="create-donation-box">
      <Header withColor isLoggedIn isFixed />

      <div className="create-donation-box-content">
        <button className="back-pill" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className="donation-box-create-card">
          <h1>Create Donation Box</h1>

          <form onSubmit={handleSubmit}>
            <div className="donation-box-grid">

              {/* LEFT COLUMN */}
              <div>
                <label className="simple-label">Photo</label>

                <div 
                  className={`photo-dropzone ${dragActive ? 'drag-active' : ''} ${photoPreview ? 'has-preview' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => !photoPreview && fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="upload-hidden"
                  />
                  
                  {photoPreview ? (
                    <div className="photo-preview-container">
                      <img src={photoPreview} alt="Preview" className="photo-preview" />
                      <div className="photo-actions">
                        <button 
                          type="button" 
                          className="change-photo-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                        >
                          Change
                        </button>
                        <button 
                          type="button" 
                          className="remove-photo-btn"
                          onClick={removePhoto}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-content">
                      <div className="upload-icon">
                        <ImageIcon size={32} />
                        {/* <Upload size={20} className="upload-arrow" /> */}
                      </div>
                      <p className="upload-text">Click to upload or drag and drop</p>
                      <p className="upload-subtext">PNG, JPG, JPEG (max. 5MB)</p>
                    </div>
                  )}
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="or-divider">
                  <span>or</span>
                </div>
                <div className="url-upload">
                  <input
                    type="text"
                    name="photoUrl"
                    placeholder="Paste image URL..."
                    value={formData.photoUrl}
                    onChange={handleChange}
                    className="url-input"
                  />
                  <button 
                    type="button" 
                    className="use-url-btn"
                    onClick={() => {
                      if (formData.photoUrl) {
                        setPhotoPreview(formData.photoUrl);
                        setError('');
                      } else {
                        setError('Please enter a valid image URL');
                      }
                    }}
                  >
                    Use URL
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div>
                <label className="simple-label">Donation Box Title</label>
                <input
                  className="simple-input"
                  name="title"
                  placeholder="e.g. Help Marsha In Need!"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <label className="simple-label">Description</label>
                <textarea
                  className="simple-textarea"
                  name="description"
                  placeholder="e.g. Marsha Marsha Marsha Marsh"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

                <label className="simple-label">Goal Amount</label>
                <input
                  className="simple-input"
                  type="number"
                  name="goalAmount"
                  placeholder="e.g. 10,203"
                  value={formData.goalAmount}
                  onChange={handleChange}
                  required
                />

                <label className="simple-label">Target Date (Optional)</label>
                <input
                  className="simple-input"
                  type="date"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="donation-save-button">
              Save Donation Box
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDonationBox;
