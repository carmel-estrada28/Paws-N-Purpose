import "./MyProjects.css";
import Header from '../../components/Header/Header';
import Campaign from "../../components/Projects/Campaign";
import SearchBox from "../../components/SearchBox/SearchBox";
import Button from "../../components/Buttons/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProjects() {
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
    { label: 'Active', value: 'Active' },
    { label: 'Archived', value: 'Archived' },
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
            {/* <Card card_width="100%"> */}
              <div className="sideBar_categories-section">
                <div className="sideBar_categories-list">
                  {categories.map(category => {
                    const count = campaigns.filter(camp => camp.category === category.value).length;
                    return (
                      <button
                        key={category.value}
                        onClick={() => {
                          // Toggle selection - if clicking the same category, set to "All Campaigns"
                          setSelectedCategory(prevCategory => 
                            prevCategory === category.value ? "All Campaigns" : category.value
                          );
                        }}
                        className={`sideBar_category-btn ${selectedCategory === category.value ? 'sideBar_category-btn-active' : ''}`}
                      >
                        {category.label}
                        <span className="category-count">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            {/* </Card> */}
          </div>

          <div className="myprojects-main">
            <div className="myprojects-header">
              <div className="myprojects-search-container">
                <SearchBox 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search campaigns"
                />
              </div>
            
              <div className="myprojects-create-buttons">
                <Button 
                  type="button" 
                  text="Create Donation Box" 
                  theme="semi-rounded"
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
                  onClick={() => navigate('/create-campaign/step-1')}
                />
              </div>
            </div>

            <div className="myprojects-campaigns-container">
              <div className="myprojects-campaigns-grid">
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <Campaign 
                      key={campaign.id}
                      campaignTitle={campaign.title}
                      campaign={{
                        id: campaign.id,
                        title: campaign.title,
                        description: "Help support this important cause with your donation.",
                        raised: campaign.raised,
                        goal: campaign.goal,
                        status: campaign.status,
                        category: campaign.category,
                        image: "https://source.unsplash.com/random/400x300/?animal,pet"
                      }}
                    />
                  ))
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
    </div>
  );
}