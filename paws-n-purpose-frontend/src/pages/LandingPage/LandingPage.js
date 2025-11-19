import React from 'react';
import { useLocation } from "react-router-dom";
import HeaderBeforeLogin from "../../components/Header/Header";
/*import HeaderBeforeLoginGreen from '../../components/Headers/HeaderBeforeLoginGreen/HeaderBeforeLoginGreen';
*/
import CampaignCard from '../../components/CampaignCards/CampaignCard';
import SearchBox from '../../components/SearchBox/SearchBox';
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
      organization: 'Organisation'
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
      organization: 'Eprem'
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
      organization: 'Gena'
    }
  ];

  const categories = ['All', 'Single-pets', 'Multi-pets'];
  const filters = ['Popular', 'Recently Opened', 'Ending Soon'];

  return (
    <div className="landing-page">
      <HeaderBeforeLogin withColor={true} isLoggedIn={false}/>
      
      <div className="landing-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-container">
            {/* Search */}
            <SearchBox 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search campaigns"
            />

            {/* Categories */}
            <div className="categories-section">
              <h3 className="section-title">Categories</h3>
              <div className="categories-list">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className={`category-btn ${selectedCategory === category.toLowerCase() ? 'category-btn-active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Filters */}
              <div className="filters-section">
                <div className="filters-row">
                  <button
                    onClick={() => setSelectedFilter('popular')}
                    className={`filter-btn ${selectedFilter === 'popular' ? 'filter-btn-active' : ''}`}
                  >
                    Popular
                  </button>
                  <button
                    onClick={() => setSelectedFilter('recently-opened')}
                    className={`filter-btn ${selectedFilter === 'recently-opened' ? 'filter-btn-active' : ''}`}
                  >
                    Recently Opened
                  </button>
                </div>
                <button
                  onClick={() => setSelectedFilter('ending-soon')}
                  className={`filter-btn ${selectedFilter === 'ending-soon' ? 'filter-btn-active' : ''}`}
                >
                  Ending Soon
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
  <div className="content-header">
    <h2 className="content-title">Campaigns</h2>
    <span className="breadcrumb-arrow">›</span>
    <span className="breadcrumb-item">All</span>
  </div>

  <div className="campaigns-scroll">
    <div className="campaigns-grid">
      {campaigns.map(campaign => (
        <CampaignCard 
          key={campaign.id}
          campaign={campaign}
          onView={() => console.log('View campaign:', campaign.id)}
          onDonate={onLogin}
        />
      ))}
    </div>
  </div>
</main>

      </div>
    </div>
  );
}