import React from 'react';
import { useLocation } from "react-router-dom";
import HeaderBeforeLogin from "../../components/Header/Header";
import SideBar from '../../components/SideBar/SideBar';
import CampaignCard from '../../components/CampaignCards/CampaignCard';
import SearchBox from '../../components/SearchBox/SearchBox';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

export default function LandingPage({ onLogin }) {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedFilter, setSelectedFilter] = React.useState('recently-opened');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchModalOpen, setSearchModalOpen] = React.useState(false);
  const searchRowRef = React.useRef(null);
  const modalRef = React.useRef(null);
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

  const handleViewCampaign = (campaignId) => {
    // navigate to campaign view
    navigate(`/campaign/${campaignId}`);
  };

  const handleDonate = (campaignId) => {
    console.log('Donate to campaign:', campaignId);
    onLogin();
  };

  return (
    <div className="landing-page">
      <HeaderBeforeLogin withColor={true} isLoggedIn={false} isFixed={true}/>
      
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
        <div className="landing-search-row" ref={searchRowRef}>
          <SearchBox
            value={searchQuery}
            onChange={(val) => { setSearchQuery(val); setSearchModalOpen(true); }}
            placeholder="Search campaigns"
            onFocus={() => setSearchModalOpen(true)}
            onBlur={() => {/* keep modal open until click outside handled below */}}
          />

          {searchModalOpen && (
            <div className="search-modal" ref={modalRef} role="dialog" aria-label="Search results">
              <div className="search-modal-inner">
                <div className="search-results-list">
                  {filteredCampaigns.length === 0 ? (
                    <div className="empty-results">No campaigns found</div>
                  ) : (
                    filteredCampaigns.map(item => (
                      <button key={item.id} className="search-result-item" onMouseDown={(e) => { e.preventDefault(); setSearchModalOpen(false); navigate(`/campaign/${item.id}`); }}>
                        <div className="result-left">
                          <div className="result-tag">Donation Box</div>
                          <div className="result-title">{item.name}</div>
                          <div className="result-sub">₱{item.amountRaised.toLocaleString()} raised of ₱{item.goal.toLocaleString()}</div>
                        </div>
                        <div className="result-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
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