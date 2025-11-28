import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderBeforeLogin from "../../components/Header/Header";
import Button from '../../components/Buttons/Button';
import CampaignTabs from '../../components/CampaignTabs/CampaignTabs';
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import MoreCampaigns from '../../components/MoreCampaigns/MoreCampaigns';
import { useCampaign } from '../../hooks/useCampaign';
import { useDonation } from '../../hooks/useDonation';
import './ViewCampaign.css';

export default function ViewCampaign({ onLogin }) {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  
  const { campaign, loading, error } = useCampaign(campaignId);
  const { donate, processing } = useDonation();

  const [activeTab, setActiveTab] = useState('story');

  if (loading) {
    return <div className="loading">Loading campaign...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!campaign) {
    return <div className="not-found">Campaign not found</div>;
  }

  const handleDonate = () => {
    onLogin();
  };

  const handleShare = () => {
    console.log('Share campaign:', campaignId);
  };

  return (
    <div className="view-campaign-page">
      <HeaderBeforeLogin withColor={true} isLoggedIn={false}/>
      <div className='green-gradient' 
        style={{
          background: "linear-gradient(180deg, #78B96C 0%, #78B96C 15%, #FFFCF3 60%)",
          position: "absolute",
          top: "0",
          left: "0",
          height: "100vh",
          width: "100%",
        }}
      />
      
      <div className="view-campaign-content">
        <main className="campaign-main-content">
          {/* White Container - Everything inside this card */}
          <div className="campaign-detail-container">
            {/* Back Button inside the card */}
            <button 
              className="back-button-inside"
              onClick={() => navigate('/landing')}
            >
              ← Back to Campaigns
            </button>

            <div className="campaign-grid">
              {/* Left Column - Image and Tabs */}
              <div className="campaign-left-column">
                {/* Campaign Image */}
                {activeTab === 'story' && (
                  <div className="campaign-image-section">
                    <div className="campaign-image-container">
                      <img 
                        src={campaign.image} 
                        alt={campaign.name}
                        className="campaign-image"
                      />
                    </div>
                  </div>
                )}

                {/* Tabs */}
                <CampaignTabs 
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {/* Campaign Title */}
                <h1 className="campaign-title-main">
                  {campaign.name} needs help
                </h1>

                {/* Tab Content */}
                <div className="tab-content">
                  {activeTab === 'story' && (
                    <div className="story-content">
                      <p>
                        Bella is based in your self-disabilities and we will be informed of any plans you provided to this bella needs help.
                      </p>
                      <p>
                        This helps us understand the benefits of our customers. The right part of the plan has been paid for by the team, but we can also provide a better understanding of how to make decisions about the benefits of our customers.
                      </p>
                      
                      
                      </div>
                    
                  )}

                  {activeTab === 'donation-box' && (
                    <div className="donation-box-content">
                      <p>Donation box for this campaign will be listed here.</p>
                    </div>
                  )}

                  {activeTab === 'updates' && (
                    <div className="updates-content">
                      <p>No updates available yet. Check back soon!</p>
                    </div>
                  )}

                  {activeTab === 'activity' && (
                    <div className="activity-content">
                      <p>Activity for this campaign will be listed here.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Donation Info and More Campaigns */}
              {activeTab === 'story' && (
                <div className="campaign-right-column">
                  <DonationInfo 
                    campaign={campaign}
                    onDonate={handleDonate}
                    onShare={handleShare}
                    processing={processing}
                  />
                  
                  <MoreCampaigns 
                    currentCampaignId={campaign.id}
                    onCampaignClick={(id) => navigate(`/campaign/${id}`)}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}