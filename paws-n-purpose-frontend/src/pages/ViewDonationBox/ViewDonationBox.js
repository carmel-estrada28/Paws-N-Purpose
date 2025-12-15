import React, { useState, useEffect, useContext } from 'react';
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
import DonateModal from '../../components/DonateModal/DonateModal';
import { AuthContext } from '../../components/Routes/AuthContext'; 
import './ViewDonationBox.css';


// DEV: Toggle this to 'owner' or 'non-owner' to preview both views easily
const MOCK_VIEW = 'owner'; // 'owner' or 'non-owner'

export default function ViewDonationBox() {
  const { donationBoxId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAddUpdatesModalOpen, setIsAddUpdatesModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
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
  const isAuthenticated = !!user;

  // State for donation box data, loading, and error
  const [donationBox, setDonationBox] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddUpdatesModalOpen, setIsAddUpdatesModalOpen] = useState(false);

  // Get navigation state
  const fromPage = location.state?.from || null;
  const campaignId = location.state?.campaignId || null;

  // Determine header type
  let showLoggedInHeader;
  if (fromPage === '/landing') {
    showLoggedInHeader = false;
  } else if (fromPage === '/campaign-list') {
    showLoggedInHeader = true;
  } else {
    showLoggedInHeader = isAuthenticated;
  }

  // Fetch donation box data from backend
  useEffect(() => {
    setLoading(true);
    setError(null);
    // Try to fetch from backend, but fallback to mock data if it fails
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/donation-boxes/${donationBoxId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch donation box');
        return res.json();
      })
      .then(data => {
        setDonationBox(data);
        setUpdates(data.updates || []);
        setLoading(false);
      })
      .catch(() => {
        // MOCK DATA FALLBACK
        const mockOwnerId = 'mock-owner-id-123';
        const mockUser = MOCK_VIEW === 'owner'
          ? { id: mockOwnerId, name: 'Owner User', avatar: 'https://ui-avatars.com/api/?name=Owner+User&background=DD4391&color=fff' }
          : { id: 'mock-non-owner-id-456', name: 'Other User', avatar: 'https://ui-avatars.com/api/?name=Other+User&background=DD4391&color=fff' };
        const mockDonationBox = {
          id: donationBoxId,
          name: 'Sample Donation Box',
          description: 'This is a mock donation box for preview and development. You can see how the page looks as an owner or non-owner.',
          image: 'https://placekitten.com/600/400',
          creatorId: mockOwnerId,
          amountRaised: 2500,
          goal: 10000,
          totalDonors: 42,
          lastDonation: '2 hours ago',
          updates: [
            {
              id: 1,
              userName: 'Jane Doe',
              datePosted: '2025-12-10',
              content: 'We just reached 25% of our goal! Thank you to all donors.',
              userAvatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=DD4391&color=fff'
            },
            {
              id: 2,
              userName: 'John Smith',
              datePosted: '2025-12-12',
              content: 'New supplies have arrived for the shelter. Your donations are making a difference!',
              userAvatar: 'https://ui-avatars.com/api/?name=John+Smith&background=DD4391&color=fff'
            }
          ]
        };
        setDonationBox(mockDonationBox);
        setUpdates(mockDonationBox.updates);
        // Override user for mock view
        authContext.user = mockUser;
        setLoading(false);
      });
  }, [donationBoxId]);

  // Determine ownership
  // For mock, force user and owner logic
  const isDonationBoxOwner = MOCK_VIEW === 'owner';

  // Handlers
  const handleDonate = () => {
    setIsDonateModalOpen(true);
  };

  const handleShare = () => {
    // Implement share logic
    console.log('Share clicked');
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname, message: 'Please login to save this donation box' } });
    } else {
      // Implement save logic
      console.log('Saving donation box for user:', user);
    }
  };

  const handleEdit = () => {
    if (isDonationBoxOwner) {
      // Implement edit logic or navigation
      console.log('Editing donation box:', donationBoxId);
    }
  };

  const handleBack = () => {
    if (fromPage) {
      navigate(fromPage);
      return;
    }
    if (campaignId) {
      navigate(`/campaign/${campaignId}`);
    } else if (isAuthenticated) {
      navigate('/campaign-list');
    } else {
      navigate('/landing');
    }
  };

  const getBackButtonText = () => {
    if (fromPage === '/landing') return ' Back to Home';
    if (fromPage === '/campaign-list') return ' Back to Discover';
    if (campaignId) return ' Back to Campaign';
    if (isAuthenticated) return ' Back to Discover';
    return ' Back to Home';
  };

  const handleAddUpdate = (newUpdate) => {
    const updateToAdd = {
      id: updates.length + 1,
      userName: user?.name || 'Current User',
      datePosted: 'Just now',
      content: newUpdate,
      userAvatar: user?.avatar || 'https://ui-avatars.com/api/?name=User&background=DD4391&color=fff'
    };
    setUpdates([updateToAdd, ...updates]);
    setIsAddUpdatesModalOpen(false);
  };

  // Loading and error states
  if (loading) {
    return <div className="loading">Loading donation box...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!donationBox) {
    return <div className="not-found">Donation box not found.</div>;
  }

  return (
    <div className="view-donation-box-page">
      <Header withColor={true} isLoggedIn={showLoggedInHeader} />
      <main className="view-donation-box-container">
        {/* Back Navigation */}
        <nav className="back-navigation">
          <button onClick={handleBack} className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
            {/* Campaign Info Bar removed as requested */}

            {/* Description Card */}
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
          <div className="donation-box-content-section">
            <Card card_width="100%">
              <div className="updates-section">
                <div className="updates-header">
                  <h3 className="updates-title">Updates</h3>
                  {/* Only show Add New Update button for owner */}
                  {isDonationBoxOwner && (
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
                {/* Always show all updates for both owners and non-owners */}
                <UpdatesList 
                  updates={updates}
                  ownerProfile={{
                    name: user?.name || 'User\'s Name',
                    avatar: user?.avatar || 'https://ui-avatars.com/api/?name=User&background=DD4391&color=fff'
                  }}
                />
              </div>
              {/* Only show AddUpdates modal for owner */}
              {isDonationBoxOwner && (
                <AddUpdates
                  isOpen={isAddUpdatesModalOpen}
                  onClose={() => setIsAddUpdatesModalOpen(false)}
                  onSave={handleAddUpdate}
                />
              )}
            </Card>
          </div>
        </div>

        {/* Donate Modal */}
        <DonateModal
          isOpen={isDonateModalOpen}
          onClose={() => setIsDonateModalOpen(false)}
          donationBox={donationBox}
        />
      </main>  
    </div>
  );
}