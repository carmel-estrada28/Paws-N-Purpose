import React, { useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CampaignHero from '../../components/CampaignHero/CampaignHero';
import DonationBoxProg from '../../components/DonationBoxProg/DonationBoxProg';
import Card from '../../components/Card/Card';
import Button from '../../components/Buttons/Button';
import AddUpdates from '../../components/Updates/AddUpdates';
import UpdatesList from '../../components/Updates/UpdatesList';
import CampaignCard from '../../components/Projects/CampaignCard';
import CampaignInfoBar from '../../components/CampaignInfoBar/CampaignInfoBar';
import { AuthContext } from '../../components/Routes/AuthContext'; 
import './ViewDonationBox.css';

export default function ViewDonationBox() {
  const { donationBoxId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAddUpdatesModalOpen, setIsAddUpdatesModalOpen] = useState(false);
  const [updates, setUpdates] = useState([
    {
      id: 1,
      userName: 'User\'s Name',
      datePosted: '2 days ago',
      content: 'Updates about this donation box. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      userAvatar: 'https://i.pinimg.com/736x/df/14/35/df14354dfd73264b73f33c2e4f0fdf1b.jpg'
    },
    {
      id: 2,
      userName: 'Another User',
      datePosted: '1 week ago',
      content: 'Another update about the progress. The animal is doing well and responding to treatment.',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  ]);
  
  // Use AuthContext
  const authContext = useContext(AuthContext);
  const user = authContext?.user || null;
  const authLoading = authContext?.loading || false;
  const isAuthenticated = !!user;
  
  // Get navigation state
  const fromPage = location.state?.from || null;
  const campaignId = location.state?.campaignId || null;
  
  // Determine header type - same logic as ViewCampaign
  let showLoggedInHeader;
  if (fromPage === '/landing') {
    showLoggedInHeader = false;
  } else if (fromPage === '/campaign-list') {
    showLoggedInHeader = true;
  } else {
    showLoggedInHeader = isAuthenticated;
  }
  
  // Mock data for the donation box
  const donationBox = {
    id: donationBoxId || '1',
    name: 'Name of Donation Box',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    goal: 10000,
    amountRaised: 7000,
    totalDonors: 100,
    lastDonation: '2 hrs ago',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    campaign: campaignId ? {
      id: campaignId,
      name: 'Save the Strays Campaign',
      driveName: 'Animal Rescue Drive',
      daysLeft: 15,
      amountRaised: 50000,
      goal: 100000,
      description: 'Helping stray animals find homes and medical care',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    } : null,
    creatorId: 'user123' // Mock creator ID
  };
  
  // Check if current user is the donation box owner
  const isDonationBoxOwner = isAuthenticated && user?.id === donationBox.creatorId;

  // Check if current user is the campaign owner (if campaign exists)
  const isCampaignOwner = isAuthenticated && donationBox.campaign && user?.id === donationBox.campaign.creatorId;
  
  const handleDonate = () => {
    console.log('Donate clicked for donation box:', donationBox.id);
    // Navigate to donation page
  };
  
  const handleShare = () => {
    console.log('Share clicked');
    // Implement share functionality
  };
  
  const handleSave = () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: location.pathname,
          message: 'Please login to save this donation box'
        }
      });
    } else {
      console.log('Saving donation box for user:', user);
      // Implement save functionality
    }
  };
  
  const handleEdit = () => {
    if (isDonationBoxOwner) {
      console.log('Editing donation box:', donationBoxId);
      // Navigate to edit page
    }
  };
  
  const handleBack = () => {
    if (fromPage) {
      navigate(fromPage);
      return;
    }
    
    // If we have a campaignId, go back to that campaign
    if (campaignId) {
      navigate(`/campaign/${campaignId}`);
    } else if (isAuthenticated) {
      navigate('/campaign-list');
    } else {
      navigate('/landing');
    }
  };
  
  const getBackButtonText = () => {
    if (fromPage === '/landing') {
      return ' Back to Home';
    } else if (fromPage === '/campaign-list') {
      return ' Back to Discover';
    } else if (campaignId) {
      return ' Back to Campaign';
    } else if (isAuthenticated) {
      return ' Back to Discover';
    } else {
      return ' Back to Home';
    }
  };
  
  const handleAddUpdate = (newUpdate) => {
    const updateToAdd = {
      id: updates.length + 1,
      userName: user?.name || 'Current User',
      datePosted: 'Just now',
      content: newUpdate,
      userAvatar: user?.avatar || 'https://i.pinimg.com/736x/df/14/35/df14354dfd73264b73f33c2e4f0fdf1b.jpg'
    };
    setUpdates([updateToAdd, ...updates]);
    setIsAddUpdatesModalOpen(false);
  };
  
  const handleViewCampaign = () => {
    if (campaignId) {
      navigate(`/campaign/${campaignId}`);
    }
  };
  
  const handleDonateToCampaign = () => {
    if (campaignId) {
      console.log('Donate to campaign:', campaignId);
    }
  };
  
  return (
    <div className="view-donation-box-page">
      <Header withColor={true} isLoggedIn={showLoggedInHeader} />
      
      <main className="view-donation-box-container">
        {/* Back Navigation */}
        <nav className="back-navigation">
          <button onClick={handleBack} className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#053534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {getBackButtonText()}
          </button>
        </nav>
        
        {/* TOP SECTION: Image left, Progress right */}
        <div className="donation-box-top-section">
          {/* Left: Campaign Hero (Image) */}
          <div className="donation-box-image-section">
            <CampaignHero
              image={donationBox.image}
              tag="Donation Box"
            />
            {/* Campaign Info Bar */}
            <CampaignInfoBar campaign={donationBox.campaign} />

            {/* Description Card - directly below campaign info bar */}
            <Card card_width="100%">
              <div className="donation-box-description-card">
                <h2 className="description-title">{donationBox.name}</h2>
                <p className="description-text">{donationBox.description}</p>
                <button className="read-more-btn">Read more</button>
              </div>
            </Card>
          </div>
          
          {/* Right: Donation Box Progress */}
          <div className="donation-box-progress-section">
            <DonationBoxProg 
              donationBox={donationBox}
              onDonate={handleDonate}
              onShare={handleShare}
              onSave={handleSave}
              onEdit={handleEdit}
              isOwner={isDonationBoxOwner}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
        
        {/* BOTTOM SECTION: Description and Updates */}
        <div className="donation-box-bottom-section">
          {/* Left: Description and Updates */}
          <div className="donation-box-content-section">
            {/* Updates Card */}
            <Card card_width="100%">
              <div className="updates-section">
                <div className="updates-header">
                  <h3 className="updates-title">Updates</h3>
                  {isCampaignOwner && (
                    <Button
                      type="button"
                      text="Add New Update"
                      onClick={() => setIsAddUpdatesModalOpen(true)}
                      theme="pink semi-rounded"
                      vPadding={0.5}
                      hPadding={1.5}
                    />
                  )}
                </div>
                {/* Only show updates by the owner, and only show owner's profile */}
                <UpdatesList 
                  updates={updates.filter(u => u.userId === donationBox.creatorId)}
                  ownerProfile={{
                    name: user?.name || 'User\'s Name',
                    avatar: user?.avatar || 'https://ui-avatars.com/api/?name=User&background=DD4391&color=fff'
                  }}
                />
              </div>
            </Card>

            {/* AddUpdates Modal */}
            {isCampaignOwner && (
              <AddUpdates
                isOpen={isAddUpdatesModalOpen}
                onClose={() => setIsAddUpdatesModalOpen(false)}
                onSave={handleAddUpdate}
              />
            )}
          </div>
        </div>
      </main>  
    </div>
  );
}