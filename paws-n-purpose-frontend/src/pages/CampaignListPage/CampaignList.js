import React from 'react';
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header"; // Assuming this is the header component for logged-in users
import SideBar from '../../components/SideBar/SideBar';
import DonationBox from '../../components/Projects/DonationBox';
import SearchBox from '../../components/SearchBox/SearchBox';
import SearchModal from '../../components/SearchModal/SearchModal';
import './CampaignList.css';
import { useNavigate } from 'react-router-dom';

export default function CampaignList() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedFilter, setSelectedFilter] = React.useState('recently-opened');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchModalOpen, setSearchModalOpen] = React.useState(false);
  const searchRowRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const [modalStyle, setModalStyle] = React.useState(null);
  const [rowStyle, setRowStyle] = React.useState(null);
  const [placeholderHeight, setPlaceholderHeight] = React.useState(0);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    function handleClickOutside(e) {
      const modalNode = modalRef.current;
      const rowNode = searchRowRef.current;
      // if neither modal nor search row contain the click target, close modal
      if (modalNode && !modalNode.contains(e.target) && !(rowNode && rowNode.contains(e.target))) {
        setSearchModalOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setSearchModalOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // compute fixed style for the floating modal (keeps input in-flow)
  React.useEffect(() => {
    if (!searchModalOpen) {
      setModalStyle(null);
      setRowStyle(null);
      setPlaceholderHeight(0);
      return;
    }

    // Compute position once when opened; keep both row and modal fixed together while scrolling
    function computeStyle() {
      const row = searchRowRef.current;
      if (!row) return;
      const rect = row.getBoundingClientRect();
      // use rect.top for row fixed top, and rect.bottom - 1 for modal top to remove tiny gap
      const rowFixed = {
        position: 'fixed',
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        zIndex: 1200
      };
      const modalFixed = {
        position: 'fixed',
        left: `${rect.left}px`,
        top: `${rect.bottom - 1}px`,
        width: `${rect.width}px`,
        zIndex: 1200
      };

      setRowStyle(rowFixed);
      setModalStyle(modalFixed);
      setPlaceholderHeight(rect.height);
    }

    computeStyle();
    // Update on window resize only; do NOT update on scroll so both stay in place
    window.addEventListener('resize', computeStyle);
    return () => {
      window.removeEventListener('resize', computeStyle);
    };
  }, [searchModalOpen]);

  // Note: do not lock body scrolling so main content stays scrollable while modal is fixed

  // Use 6 dummy donation boxes for campaigns for demo
  const campaigns = [
    {
      id: 1,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 2,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 3,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 4,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 5,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
    {
      id: 6,
      title: 'Operation Rescue 2025',
      description: 'Max was found abandoned with a broken leg. He needs immediate surgery to walk again and live...',
      image: 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg',
      amountRaised: 12000,
      goal: 100000,
      daysLeft: 12,
      targetDate: 'June 15, 2026',
      category: 'donation-boxes',
    },
  ];

  // Filter campaigns based on selected category, filter, and search query
  const filteredCampaigns = campaigns.filter(campaign => {
    // Category filter
    const categoryMatch = selectedCategory === 'all' || campaign.category === selectedCategory;
    // Use title/description fallback for new donationBox structure
    const search = (searchQuery || '').toLowerCase();
    const name = (campaign.name || campaign.title || '').toLowerCase();
    const driveName = (campaign.driveName || '').toLowerCase();
    const description = (campaign.description || '').toLowerCase();
    const searchMatch = name.includes(search) || driveName.includes(search) || description.includes(search);
    return categoryMatch && searchMatch;
  });

  // Sort campaigns based on selected filter
  const sortedAndFilteredCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (selectedFilter) {
      case 'popular':
        // Sort by progress percentage (amountRaised / goal)
        const progressA = (a.amountRaised / a.goal) * 100;
        const progressB = (b.amountRaised / b.goal) * 100;
        return progressB - progressA;
      
      case 'recently-opened':
        // Assuming newer campaigns have higher IDs - you might want to add a date field
        return b.id - a.id;
      
      case 'ending-soon':
        // Sort by days left (ascending)
        return a.daysLeft - b.daysLeft;
      
      default:
        return 0;
    }
  });

// CampaignList.js - Update handleViewCampaign:
const handleViewCampaign = (campaignId) => {
  // For logged-in users, go to protected route
  navigate(`/user/campaign/${campaignId}`, {
    state: { from: '/campaign-list', isPublic: false }
  });
};

  const handleDonate = (campaignId) => {
    console.log('Donate to campaign:', campaignId);
    navigate(`/campaign/${campaignId}/donate`);
  };

  return (
    <div className="campaign-list-page">
      {/* Using Header with isLoggedIn={true} as requested */}
      <Header withColor={true} isLoggedIn={true} isFixed={true}/>
      
      <SideBar 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content*/}
      <div className="main-content-new">
        <div className="landing-search-row-wrapper">
          {rowStyle && <div style={{ height: placeholderHeight }} aria-hidden="true" />}
          <div className="landing-search-row" ref={searchRowRef} style={rowStyle || {}}>
            <SearchBox
              value={searchQuery}
              onChange={(val) => { setSearchQuery(val); setSearchModalOpen(true); }}
              placeholder="Search donations"
              onFocus={() => setSearchModalOpen(true)}
              onBlur={() => {/* keep modal open until click outside handled below */}}
            />
          </div>

          <SearchModal
            isOpen={searchModalOpen}
            modalRef={modalRef}
            modalStyle={modalStyle}
            campaigns={filteredCampaigns}
            onCampaignSelect={(id) => {
              setSearchModalOpen(false);
              // Navigate to user donation box view
              navigate(`/user/donation-box/${id}`, {
                state: { from: '/campaign-list', isPublic: false }
              });
            }}
            navigate={navigate}
          />
        </div>

        <div className="discover-row">
          <h2 className="discover-title">Discover Campaigns</h2>
          <div className="discover-breadcrumb">&nbsp;›&nbsp;All</div>
        </div>

        <div className="campaigns-list-new" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginTop: '2rem',
        }}>
          {sortedAndFilteredCampaigns.length === 0 ? (
            <div className="no-campaigns" style={{ gridColumn: '1 / -1' }}>
              <p>No campaigns found matching your criteria.</p>
            </div>
          ) : (
            sortedAndFilteredCampaigns.map(box => (
              <div
                key={box.id}
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'stretch', cursor: 'pointer' }}
                onClick={e => {
                  // Prevent click if a button was clicked
                  if (e.target.tagName === 'BUTTON') return;
                  navigate(`/donation-box/${box.id}`, {
                    state: { from: '/campaign-list', isPublic: true }
                  });
                }}
              >
                <DonationBox
                  donationBox={box}
                  hasMaxWidth={true}
                  onView={() => navigate(`/donation-box/${box.id}`, { state: { from: '/campaign-list', isPublic: true } })}
                  onDonate={() => handleDonate(box.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}