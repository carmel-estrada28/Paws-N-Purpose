import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import Header from '../../components/Header/Header';
import './CreateCampaign.css';

function CreateCampaign() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetDate: '',
    coverPhoto: null,
    coverPhotoUrl: ''
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      setFormData(prev => ({
        ...prev,
        coverPhoto: file,
        coverPhotoUrl: ''
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      coverPhotoUrl: value,
      coverPhoto: null
    }));
  };

  const handleUseUrl = () => {
    if (formData.coverPhotoUrl) {
      // Basic URL validation
      try {
        new URL(formData.coverPhotoUrl);
        setPhotoPreview(formData.coverPhotoUrl);
        setFormData(prev => ({
          ...prev,
          coverPhoto: null
        }));
        setError('');
      } catch (e) {
        setError('Please enter a valid URL (e.g., https://example.com/image.jpg)');
      }
    } else {
      setError('Please enter an image URL');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          coverPhoto: file,
          coverPhotoUrl: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="create-campaign">
      <Header withColor isLoggedIn isFixed />
      
      <div className="create-campaign-content">
        <div className="create-campaign-header">
          <button className="back-pill" onClick={() => navigate('/my-projects')}>
            <ArrowLeft size={16} /> Back
          </button>
          
          <div className="progress-steps">
            <div className={`step-item ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <div className="step-number">1</div>
              <span className="step-text">Campaign Details</span>
            </div>
            <div className={`step-item ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <span className="step-text">Add Donation Boxes</span>
            </div>
            <div className={`step-item ${currentStep === 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span className="step-text">Review & Publish</span>
            </div>
          </div>
        </div>
        <div className="create-campaign-card">
          <h1>Campaign Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="campaign-form-grid">
              {/* Left Column - Form Fields */}
              <div>
                <div className="form-group">
                  <label htmlFor="title">Campaign Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter campaign title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your campaign..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="targetDate">Target Date</label>
                  <input
                    type="date"
                    id="targetDate"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Right Column - Photo Upload */}
              <div className="photo-upload">
                <label>Cover Photo</label>
                <div 
                  className={`photo-preview ${photoPreview ? 'has-image' : ''}`}
                  onClick={triggerFileInput}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {photoPreview ? (
                    <div className="photo-preview-container">
                      <img src={photoPreview} alt="Preview" className="photo-preview-img" />
                      <div className="photo-actions">
                        <button 
                          type="button" 
                          className="change-photo-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerFileInput();
                          }}
                        >
                          Change
                        </button>
                        <button 
                          type="button" 
                          className="remove-photo-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPhotoPreview(null);
                            setFormData(prev => ({
                              ...prev,
                              coverPhoto: null,
                              coverPhotoUrl: ''
                            }));
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-content">
                      <div className="upload-icon">
                        <ImageIcon size={32} />
                      </div>
                      <p className="upload-text">Click to upload or drag and drop</p>
                      <p className="upload-subtext">PNG, JPG, JPEG (max. 5MB)</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="upload-hidden"
                  />
                </div>

                <div className="or-divider">
                  <span>or</span>
                </div>

                <div className="url-upload">
                  <div className="url-input">
                    <input
                      type="text"
                      name="coverPhotoUrl"
                      placeholder="Paste image URL..."
                      value={formData.coverPhotoUrl}
                      onChange={handleImageUrlChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleUseUrl()}
                    />
                  </div>
                  <button 
                    type="button" 
                    className="use-url-btn"
                    onClick={handleUseUrl}
                  >
                    Use URL
                  </button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="draft-button">
                Save Draft
              </button>
              <button type="submit" className="next-button">
                Next: Add Donation Boxes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCampaign;