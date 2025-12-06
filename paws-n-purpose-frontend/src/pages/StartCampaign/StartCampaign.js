// pages/StartCampaign/StartCampaign.js - UPDATED
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import Button from '../../components/Buttons/Button';
import Header from '../../components/Header/Header';
import FormInput from '../../components/FormInput/FormInput';
import UploadImage from '../../components/UploadImage/UploadImage';
import './StartCampaign.css';

const StartCampaign = () => {
  const navigate = useNavigate(); // Add this
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
    // Basic validation
    if (!formData.campaignType) {
      alert('Please select a campaign type');
      return;
    }
    
    if (!formData.name.trim()) {
      alert('Please enter a pet/organization name');
      return;
    }
    
    if (!formData.goalAmount || parseFloat(formData.goalAmount) <= 0) {
      alert('Please enter a valid goal amount');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Please enter a campaign description');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms and Conditions');
      return;
    }

    // Save campaign data to localStorage or context to pass to DonationBox
    const campaignData = {
      ...formData,
      coverPhoto: selectedImage
    };
    
    // Save to localStorage or pass via state management
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
    
    // Navigate to DonationBox page
    navigate('/donation-box');
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="start-campaign-container">
      <Header withColor={true} isLoggedIn={true} />
      
      <div className="start-campaign-page">
        <div className="page-container">
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
              <h2 className="campaign-title">Start a Campaign</h2>
              
              <form className="campaign-form">
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

                <div className="form-group">
                  <label className="form-label required">Pet/Organization Name</label>
                  <FormInput 
                    placeholder="Enter name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label required">Goal Amount (₱)</label>
                  <FormInput 
                    placeholder="Enter amount"
                    type="number"
                    value={formData.goalAmount}
                    onChange={(e) => handleInputChange('goalAmount', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label required">Campaign Description</label>
                  <FormInput 
                    placeholder="Describe your campaign"
                    type="text"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Medical Details (Optional)</label>
                  <FormInput 
                    placeholder="Enter medical details if applicable"
                    type="text"
                    value={formData.medicalDetails}
                    onChange={(e) => handleInputChange('medicalDetails', e.target.value)}
                  />
                </div>

                <UploadImage 
                  selectedImage={selectedImage}
                  onImageUpload={handleImageUpload}
                  label="Upload Animal Cover Photo"
                />

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