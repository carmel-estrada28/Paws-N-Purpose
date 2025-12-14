import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Header from '../../components/Header/Header';
import DonationBox from '../../components/Projects/DonationBox';
import './ReviewCampaign.css';

function ReviewCampaign() {
  const navigate = useNavigate();

  // Mock data - replace with actual data from your state management
  const campaignData = {
    title: 'Help Marsha In Need!',
    description: 'Marsha Marsha Marsha Marsh',
    targetDate: '2024-12-31',
    goalAmount: 10000,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    donationBoxes: [
      { id: 1, title: 'Dog Food Drive', amount: 5000, current: 2500 },
      { id: 2, title: 'Vet Bills Fund', amount: 10000, current: 7500 },
    ]
  };

  const handleBack = () => {
    navigate('/create-campaign/step-2');
  };

  const handlePublish = () => {
    // Handle publish campaign
    console.log('Publishing campaign...');
    navigate('/campaign-published');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="review-campaign">
      <Header withColor isLoggedIn isFixed />
      
      <div className="review-campaign-content">
        <div className="review-header">
          <button className="back-pill" onClick={handleBack}>
            <ArrowLeft size={16} /> Back
          </button>
          
          <div className="progress-steps" data-step="3">
            <div className="progress-line" style={{ width: '100%' }}></div>
            
            <div className="step-item">
              <div className="step-number completed">
                <Check size={14} />
              </div>
              <span className="step-text">Campaign Details</span>
            </div>
            
            <div className="step-item">
              <div className="step-number completed">
                <Check size={14} />
              </div>
              <span className="step-text">Add Donation Boxes</span>
            </div>
            
            <div className="step-item">
              <div className="step-number completed">3</div>
              <span className="step-text">Review & Publish</span>
            </div>
          </div>
        </div>

        <div className="review-card">
          <h1>Review & Publish</h1>
          
          <div className="campaign-info">
            <div>
              <div className="campaign-image">
                {campaignData.image ? (
                  <img 
                    src={campaignData.image} 
                    alt={campaignData.title} 
                    className="campaign-image"
                  />
                ) : (
                  <span>Campaign Image</span>
                )}
              </div>

              <div className="campaign-tag">
              <p style={{ fontSize: "0.8rem", color: "#fff" }}>Campaign</p>
            </div>
                
            <div className="campaign-details">
              <h2>{campaignData.title}</h2>
              <p>{campaignData.description}</p>

              <div className="campaign-meta">
                <div className="meta-item">
                  <span className="meta-label">Goal</span>
                  <span className="meta-value">{formatCurrency(campaignData.goalAmount)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Target Date</span>
                  <span className="meta-value">{formatDate(campaignData.targetDate)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Donation Boxes</span>
                  <span className="meta-value">{campaignData.donationBoxes.length}</span>
                </div>
              </div>
            </div>


            </div>
            

            <div className="donation-boxes-section">
            <h3>Donation Boxes</h3>
            
            <div className="donation-boxes-grid">
              {campaignData.donationBoxes.map((box) => (
                <div key={box.id} className="donation-box-card">
                  <DonationBox 
                    donationBox={{
                      id: box.id,
                      title: box.title,
                      description: box.description || 'Help support this important cause with your donation.',
                      raised: box.current || 0,
                      goal: box.amount,
                      status: 'active',
                      category: 'Donation Box',
                      image: box.image || 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg'
                    }}
                    onView={() => {}}
                    onDonate={() => {}}
                    myDonationBox={true}
                  />
                </div>
              ))}
            </div>
          </div>
                  
          </div>
          
          
          <div className="form-actions">
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            <button className="publish-button" onClick={handlePublish}>
              Publish Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCampaign;
