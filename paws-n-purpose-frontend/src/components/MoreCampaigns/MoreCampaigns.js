import React from 'react';
import './MoreCampaigns.css';

export default function MoreCampaigns({ currentCampaignId, onCampaignClick }) {
  const moreCampaigns = [
    {
      id: 101,
      name: 'Fluffy',
      driveName: 'Emergency Surgery Fund',
      image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=300&fit=crop',
      amountRaised: 5000,
      goal: 10000
    },
    {
      id: 102,
      name: 'Max',
      driveName: 'Cancer Treatment Support',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop',
      amountRaised: 7500,
      goal: 10000
    },
    {
      id: 103,
      name: 'Charlie',
      driveName: 'Medical Care Drive',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      amountRaised: 4500,
      goal: 12000
    }
  ].filter(c => c.id !== currentCampaignId);

  return (
    <div className="more-campaigns">
      <h2 className="more-campaigns-title">More Campaigns</h2>
      <div className="campaigns-list">
        {moreCampaigns.map(campaign => {
          const progress = Math.min((campaign.amountRaised / campaign.goal) * 100, 100);
          
          return (
            <div 
              key={campaign.id} 
              className="campaign-card-small"
              onClick={() => onCampaignClick(campaign.id)}
            >
              <div className="campaign-image-small">
                <img src={campaign.image} alt={campaign.name} />
                <div className="image-overlay"></div>
                <div className="campaign-info-overlay">
                  <h3 className="campaign-name-small">{campaign.name}</h3>
                  <p className="campaign-drive-small">{campaign.driveName}</p>
                </div>
              </div>
              
              <div className="campaign-details-small">
                <div className="progress-bar-small">
                  <div 
                    className="progress-fill-small"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="campaign-stats">
                  <span className="amount-raised-small">₱{campaign.amountRaised.toLocaleString()}</span>
                  <span className="goal-small">/ ₱{campaign.goal.toLocaleString()}</span>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}