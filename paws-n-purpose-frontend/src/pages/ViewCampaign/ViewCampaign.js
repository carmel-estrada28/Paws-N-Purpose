// pages/ViewCampaign/ViewCampaign.js
import React, { useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from "../../components/Header/Header";
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import CampaignHero from '../../components/CampaignHero/CampaignHero';
import DonationBoxList from '../../components/DonationBoxList/DonationBoxList';
import { useCampaign } from '../../hooks/useCampaign';
import { useDonation } from '../../hooks/useDonation';
import { AuthContext } from '../../components/Routes/AuthContext'; 
import './ViewCampaign.css';

export default function ViewCampaign() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use AuthContext to check if user is logged in
  const authContext = useContext(AuthContext);
  const user = authContext?.user || null;
  const authLoading = authContext?.loading || false;
  const isAuthenticated = !!user; // true if user exists, false if not
  
  // Get referrer from location state (where user came from)
  // This tells us whether they came from LandingPage or CampaignList
  const fromPage = location.state?.from || null;
  
  // FIX: Determine which header to show based on where user came from
  // If from LandingPage: show non-logged-in header (false)
  // If from CampaignList: show logged-in header (true)
  // If no fromPage: use authentication status
  let showLoggedInHeader;
  
  if (fromPage === '/landing') {
    showLoggedInHeader = false; // Show non-user header
  } else if (fromPage === '/campaign-list') {
    showLoggedInHeader = true; // Show user header
  } else {
    showLoggedInHeader = isAuthenticated; // Fallback to auth status
  }
  
  const { campaign, loading: campaignLoading, error } = useCampaign(campaignId);
  const { donate, processing } = useDonation();

  // Show loading only for campaign data
  if (campaignLoading) {
    return <div className="loading">Loading campaign...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!campaign) {
    return <div className="not-found">Campaign not found</div>;
  }

  // Check if current user is the campaign owner (only if logged in)
  const isCampaignOwner = isAuthenticated && user?.id === campaign.creatorId;

  const handleShare = () => {
    console.log('Share campaign:', campaignId);
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      // If not logged in, go to login page, then return here
      navigate('/login', { 
        state: { 
          from: `/campaign/${campaignId}`,
          message: 'Please login to save this campaign'
        }
      });
    } else {
      console.log('Saving campaign for user:', user);
      // Implement save functionality
    }
  };

  const handleEdit = () => {
    if (isCampaignOwner) {
      console.log('Editing campaign:', campaignId);
      navigate(`/campaign/${campaignId}/edit`);
    }
  };

  // FIXED: Smart back button logic
  const handleBack = () => {
    // 1. First, check if we have a "from" state (where user came from)
    if (fromPage) {
      navigate(fromPage); // Go back to where they came from
      return;
    }
    
    // 2. If no "from" state, decide based on authentication
    if (isAuthenticated) {
      navigate('/campaign-list'); // Logged-in users go to CampaignList
    } else {
      navigate('/landing'); // Non-logged-in users go to LandingPage
    }
  };

  // Determine what text to show on back button
  const getBackButtonText = () => {
    if (fromPage === '/landing') {
      return '← Back to Home';
    } else if (fromPage === '/campaign-list') {
      return '← Back to Campaigns';
    } else if (isAuthenticated) {
      return '← Back to Campaigns';
    } else {
      return '← Back to Home';
    }
  };

  return (
    <div className="view-campaign-page">
      {/* 
        FIXED: Show the correct header based on where user came from
        - If from LandingPage: isLoggedIn={false} (non-user header)
        - If from CampaignList: isLoggedIn={true} (user header)
      */}
      <Header withColor={true} isLoggedIn={showLoggedInHeader} />
      
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
          <div className="campaign-detail-container">
            {/* Back button with dynamic text */}
            <button 
              className="back-button-inside"
              onClick={handleBack}
            >
              {getBackButtonText()}
            </button>

            {/* Show auth loading indicator if needed */}
            {authLoading && (
              <div className="auth-loading-indicator">
                Checking authentication...
              </div>
            )}

            <CampaignHero
              image={campaign.image}
              tag="Campaign"
              title={campaign.name}
              subtitle={campaign.description}
            />

            <div className="campaign-grid-three">
              <div className="col-left">
                <h3 className="section-heading">Donation Boxes</h3>
                <DonationBoxList donationBoxes={campaign.donationBoxes || [
                  { id: 1, name: campaign.name, image: campaign.image, condition: '', goalAmount: campaign.goal },
                ]} />
              </div>

              <div className="col-center">
                <div className="target-date-header">
                  Target Date: {campaign.targetDate || 'December 09,2025'}
                </div>
                <div className="center-cards">
                  <DonationBoxList donationBoxes={campaign.donationBoxes || [
                    { id: 10, name: campaign.name, image: campaign.image, condition: '', goalAmount: campaign.goal },
                  ]} />
                </div>
              </div>

              <div className="col-right">
                <DonationInfo 
                  campaign={campaign}
                  onShare={handleShare}
                  onSave={handleSave}
                  onEdit={handleEdit}
                  processing={processing}
                  isAuthenticated={isAuthenticated}
                  isOwner={isCampaignOwner}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}