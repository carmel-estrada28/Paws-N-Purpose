import React from 'react';
import { useLocation } from "react-router-dom";
import HeaderBeforeLogin from "../../components/Header/Header";
import SideBar from '../../components/SideBar/SideBar';
import CampaignCard from '../../components/CampaignCards/CampaignCard';
import './LandingPage.css';

export default function LandingPage({ onLogin }) {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedFilter, setSelectedFilter] = React.useState('recently-opened');
  const [searchQuery, setSearchQuery] = React.useState('');

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
    console.log('View campaign:', campaignId);
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
        <h2 className="content-title-new">Campaigns</h2>
          
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