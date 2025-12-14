import "./MyProjects.css";
import Header from '../../components/Header/Header';
import Card from "../../components/Card/Card";
import SearchBox from "../../components/SearchBox/SearchBox";
import Button from "../../components/Buttons/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProjects() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const campaigns = [
    { id: 1, title: "These stray animals need food", raised: 7000, goal: 10000, status: "active", category: "Active" },
    { id: 2, title: "Help rescue injured street dogs", raised: 4500, goal: 8000, status: "active", category: "Active" },
    { id: 3, title: "Vaccination drive for community cats", raised: 3000, goal: 5000, status: "active", category: "Active" },
    { id: 4, title: "Build a shelter for winter", raised: 12000, goal: 15000, status: "active", category: "Active" },
    { id: 5, title: "Emergency medical fund", raised: 2500, goal: 10000, status: "draft", category: "Drafts" },
    { id: 6, title: "Spay/neuter program", raised: 6000, goal: 10000, status: "completed", category: "Completed" },
    { id: 7, title: "Animal rescue van", raised: 15000, goal: 20000, status: "active", category: "Active" },
    { id: 8, title: "Winter blankets campaign", raised: 5000, goal: 8000, status: "active", category: "Active" },
  ];

  const categories = [
    { label: 'Drafts', value: 'Drafts' },
    { label: 'Active', value: 'Active' },
    { label: 'Archived', value: 'Archived' },
    { label: 'Saved', value: 'Saved'}
  ];

  const filterOptions = [
    "All Campaigns",
    "Donation Boxes",
    "Campaigns"
  ];

  // Filter campaigns based on selected category and search
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesCategory = selectedCategory === "All Campaigns" || 
                         campaign.category === selectedCategory;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
      
  const handleCreateDonationBox = () => {
    navigate('/create-donation-box', { 
      state: { from: 'my-projects' } 
    });
  };

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilter && !event.target.closest('.myprojects-filter-container')) {
        setShowFilter(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showFilter]);

  return (
    <div className="myprojects-container">
      <Header 
        withColor={true} 
        isLoggedIn={true} 
        isFixed={true}
        logoOnly={false}
      />
      
      <div className="myprojects-content-wrapper">
        <div className="myprojects-content">
          <div className="myprojects-sidebar">
            <Card card_width="100%">
              <div className="sideBar_categories-section">
                <h3 className="sideBar_section-title">Categories</h3>
                <div className="sideBar_categories-list">
                  {categories.map(category => {
                    const count = campaigns.filter(camp => camp.category === category.value).length;
                    return (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`sideBar_category-btn ${selectedCategory === category.value ? 'sideBar_category-btn-active' : ''}`}
                      >
                        {category.label}
                        <span className="category-count">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          <div className="myprojects-main">
            <div className="myprojects-header">
              <div className="myprojects-search-container">
                <SearchBox 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder=" Search campaigns"
                />
                
                <div className="myprojects-filter-container">
                  <button 
                    className="myprojects-filter-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFilter(!showFilter);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#053534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Filter
                  </button>
                  
                  {showFilter && (
                    <div className="myprojects-filter-dropdown">
                      {filterOptions.map((option, index) => (
                        <div 
                          key={index} 
                          className="myprojects-filter-option"
                          onClick={() => {
                            setSelectedCategory(option);
                            setShowFilter(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="myprojects-create-buttons">
                <Button 
                  type="button" 
                  text="Create Donation Box" 
                  theme="primary"
                  vPadding={0.75}
                  hPadding={1.5}
                  onClick={handleCreateDonationBox}
                />
                <Button 
                  type="button"
                  text="Create A Campaign"
                  theme="semi-rounded"
                  vPadding={0.75}
                  hPadding={1.5}
                  onClick={() => navigate('/create-campaign')}
                />
              </div>
            </div>

            <div className="myprojects-campaigns-grid">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => {
                  const progress = (campaign.raised / campaign.goal) * 100;
                  
                  return (
                    <Card key={campaign.id} card_width="100%">
                      <div className="myprojects-campaign-card">
                        <div className="myprojects-campaign-image">
                          <img 
                            src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                            alt={campaign.title}
                          />
                        </div>
                        <h3 className="myprojects-campaign-title">{campaign.title}</h3>
                        
                        <div className="myprojects-progress-container">
                          <div className="myprojects-progress-bar">
                            <div 
                              className="myprojects-progress-fill"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                          
                          <div className="myprojects-progress-text">
                            <span className="myprojects-raised">
                              ${campaign.raised.toLocaleString()}
                            </span>
                            <span className="myprojects-goal">
                              / ${campaign.goal.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="myprojects-progress-percentage">
                            {Math.round(progress)}%
                          </div>
                        </div>
                        
                        <div className="myprojects-campaign-actions">
                          <Button 
                            type="button"
                            text="Edit"
                            theme="semi-rounded"
                            vPadding={0.5}
                            hPadding={1}
                            onClick={() => {/* Handle edit */}}
                          />
                          <Button 
                            type="button"
                            text={campaign.status === "active" ? "Close" : "Archive"}
                            theme="semi-rounded"
                            vPadding={0.5}
                            hPadding={1}
                            onClick={() => {/* Handle close/archive */}}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="myprojects-no-results">
                  <p>No campaigns found. Try a different search or category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}