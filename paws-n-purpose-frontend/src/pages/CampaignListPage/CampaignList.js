import React from 'react';
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header"; // Assuming this is the header component for logged-in users
import SideBar from '../../components/SideBar/SideBar';
import CampaignCard from '../../components/Projects/CampaignCard';
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

  const campaigns = [
    { 
      id: 1, 
      name: 'They need your help',
      driveName: 'Emergency Surgery Fund - 1 day ago',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop',
      amountRaised: 72000,
      goal: 102000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper tempor lacus sit amet tristique. Praesent porta enim nulla, et rutrum odio mollis eu.',
      daysLeft: 14,
      organization: 'Organisation',
      category: 'single-pets'
    },
    { 
      id: 2, 
      name: 'Please help Gurt',
      driveName: 'Emergency Surgery Fund',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      amountRaised: 72000,
      goal: 102000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper tempor lacus sit amet tristique. Praesent porta enim nulla, et rutrum odio mollis eu.',
      daysLeft: 11,
      organization: 'Eprem',
      category: 'single-pets'
    },
    { 
      id: 3, 
      name: 'Gella',
      driveName: 'Emergency Surgery Fund',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
      amountRaised: 72000,
      goal: 102000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper tempor lacus sit amet tristique. Praesent porta enim nulla, et rutrum odio mollis eu.',
      daysLeft: 11,
      organization: 'Gena',
      category: 'multi-pets'
    }
  ];

  // Filter campaigns based on selected category, filter, and search query
  const filteredCampaigns = campaigns.filter(campaign => {
    // Category filter
    const categoryMatch = selectedCategory === 'all' || 
                         campaign.category === selectedCategory;
    
    // Search filter
    const searchMatch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       campaign.driveName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
              placeholder="Search campaigns"
              onFocus={() => setSearchModalOpen(true)}
              onBlur={() => {/* keep modal open until click outside handled below */}}
            />
          </div>

          <SearchModal
            isOpen={searchModalOpen}
            modalRef={modalRef}
            modalStyle={modalStyle}
            campaigns={filteredCampaigns}
            onCampaignSelect={() => setSearchModalOpen(false)}
            navigate={navigate}
          />
        </div>

        <div className="discover-row">
          <h2 className="discover-title">Discover Campaigns</h2>
          <div className="discover-breadcrumb">&nbsp;›&nbsp;All</div>
        </div>

        <div className="campaigns-list-new">
          {sortedAndFilteredCampaigns.length === 0 ? (
            <div className="no-campaigns">
              <p>No campaigns found matching your criteria.</p>
            </div>
          ) : (
            sortedAndFilteredCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id}
                campaign={campaign}
                onView={() => handleViewCampaign(campaign.id)}
                onDonate={() => handleDonate(campaign.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}