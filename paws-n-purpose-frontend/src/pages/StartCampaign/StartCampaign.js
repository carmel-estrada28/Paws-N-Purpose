// pages/StartCampaign/StartCampaign.js
import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import Header from '../../components/Header/Header';
import FormInput from '../../components/FormInput/FormInput';
import UploadImage from '../../components/UploadImage/UploadImage';
import './StartCampaign.css';

const StartCampaign = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    campaignType: '',
    name: '',
    goalAmount: '',
    description: '',
    medicalDetails: '',
    agreeToTerms: false
  });

  const handleImageUpload = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: event.target.checked
    }));
  };

  const handleNext = () => {
    // Handle form validation and navigation to next step
    console.log('Form data:', formData);
    console.log('Image:', selectedImage);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="start-campaign-container">
      <Header withColor={true} isLoggedIn={true} />
      
      <div className="start-campaign-page">
        <div className="page-container">
          {/* Back Button */}
          <div className="back-button-container">
            <Button 
              type="button"
              text="Back"
              theme="green semi-rounded"
              hPadding={1.5}
              vPadding={.5}
              onClick={handleBack}
            />
          </div>
          
          <div className="start-campaign-card">
            <div className="start-campaign-content">
              <h2 className="campaign-title">Start A Campaign!</h2>
              
              <form className="campaign-form">
                {/* Campaign Type Dropdown */}
                <div className="form-group">
                  <label className="form-label required">Campaign Type</label>
                  <select 
                    className="form-select"
                    value={formData.campaignType}
                    onChange={(e) => handleInputChange('campaignType', e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="single">Single Pet</option>
                    <option value="multi">Multi-Pet</option>
                  </select>
                </div>

                {/* Pet/Organization Name */}
                <div className="form-group">
                  <label className="form-label required">Pet/Organization Name</label>
                  <FormInput 
                    placeholder="Enter name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                {/* Goal Amount */}
                <div className="form-group">
                  <label className="form-label required">Goal Amount (₱)</label>
                  <FormInput 
                    placeholder="Enter amount"
                    type="number"
                    value={formData.goalAmount}
                    onChange={(e) => handleInputChange('goalAmount', e.target.value)}
                  />
                </div>

                {/* Campaign Description */}
                <div className="form-group">
                  <label className="form-label required">Campaign Description</label>
                  <FormInput 
                    placeholder="Describe your campaign"
                    type="text"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                {/* Medical Details (Optional) */}
                <div className="form-group">
                  <label className="form-label">Medical Details (Optional)</label>
                  <FormInput 
                    placeholder="Enter medical details if applicable"
                    type="text"
                    value={formData.medicalDetails}
                    onChange={(e) => handleInputChange('medicalDetails', e.target.value)}
                  />
                </div>

                {/* Upload Cover Photo - Now using UploadImage component */}
                <UploadImage 
                  selectedImage={selectedImage}
                  onImageUpload={handleImageUpload}
                  label="Upload Animal Cover Photo"
                />

                {/* Terms and Conditions Checkbox */}
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">I agree to the Terms and Conditions!</span>
                  </label>
                </div>

                {/* Next Button */}
                <Button 
                  type="button"
                  text="Next"
                  theme="pink semi-rounded"
                  hPadding={1.5}
                  vPadding={.5}
                  onClick={handleNext}
                />
              </form>
            </div>
          </div>
        </div>
        
        {/* Static Animal Image */}
        <div className="animal-image-section">
          <img 
            src="/CampaignCat.jpeg"
            alt="Carl The CampaignCat"
            className="animal-png"
          />
        </div>
      </div>
    </div>
  );
};

export default StartCampaign;