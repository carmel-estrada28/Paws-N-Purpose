import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Button from '../../components/Buttons/Button';
import Header from '../../components/Header/Header';
import DonationBoxModal from '../../components/DonationBoxModal/DonationBoxModal';
import './DonationBox.css';

const DonationBox = () => {
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationBoxes, setDonationBoxes] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    const savedCampaignData = localStorage.getItem('campaignData');
    if (savedCampaignData) {
      setCampaignData(JSON.parse(savedCampaignData));
    }
  }, []);

  const handleAddDonationBox = () => {
    setIsModalOpen(true);
  };

  const handleSaveDonationBox = (newBox) => {
    setDonationBoxes([...donationBoxes, newBox]);
    setIsModalOpen(false);
  };

  const handleCreateCampaign = () => {
    if (donationBoxes.length === 0) {
      alert('Please add at least one donation box');
      return;
    }

    if (!agreeToTerms) {
      alert('Please agree to the Terms and Conditions');
      return;
    }

    const completeCampaign = {
      ...campaignData,
      donationBoxes,
      dateCreated: new Date().toISOString()
    };

    console.log('Complete campaign data:', completeCampaign);
    alert('Campaign created successfully!');
    
    localStorage.removeItem('campaignData');
    navigate('/campaigns');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="donation-box-container">
      <Header withColor={true} isLoggedIn={true} />
      
      <div className="donation-box-page">
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
          
          <div className="donation-box-card">
            <div className="donation-box-content">
              <h2 className="donation-box-title">Create A Donation Box</h2>
              
              {}
              {campaignData && (
                <div className="campaign-summary">
                  <p><strong>Campaign:</strong> {campaignData.name}</p>
                  <p><strong>Goal:</strong> ₱{parseFloat(campaignData.goalAmount).toLocaleString()}</p>
                </div>
              )}
              
              <div className="donation-box-form">
                <div className="description-section">
                  <p className="description-text">
                    Create one or more donation box/es for each animal in need!
                  </p>
                </div>

                <div className="add-box-section">
                  <Button 
                    type="button"
                    text="+ Add A Donation Box"
                    theme="green semi-rounded"
                    hPadding={1.5}
                    vPadding={.75}
                    onClick={handleAddDonationBox}
                  />
                </div>

                <div className="donation-boxes-list">
                  {donationBoxes.length === 0 ? (
                    <p className="no-boxes-message">No donation boxes added yet. Click the button above to add one.</p>
                  ) : (
                    donationBoxes.map((box) => (
                      <div key={box.id} className="donation-box-display">
                        {box.image && (
                          <img 
                            src={box.image} 
                            alt={box.name} 
                            className="donation-box-image"
                          />
                        )}
                        <div className="donation-box-info">
                          <h3 className="donation-box-name">{box.name}</h3>
                          <p className="donation-box-condition">{box.condition}</p>
                          {box.goalAmount && (
                            <p className="donation-box-amount">Goal: ₱{parseFloat(box.goalAmount).toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="terms-section">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">I agree to the Terms and Conditions!</span>
                  </label>
                </div>

                <Button 
                  type="button"
                  text="Create Campaign"
                  theme="pink semi-rounded"
                  hPadding={1.5}
                  vPadding={.75}
                  onClick={handleCreateCampaign}
                />
              </div>
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

      <DonationBoxModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDonationBox}
      />
    </div>
  );
};

export default DonationBox;