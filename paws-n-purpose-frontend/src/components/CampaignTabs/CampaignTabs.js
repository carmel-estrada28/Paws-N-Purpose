import React from 'react';
import './CampaignTabs.css';

export default function CampaignTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'story', label: 'Story' },
    { id: 'donation-box', label: 'Donation Box' },
    { id: 'updates', label: 'Updates' },
    { id: 'activity', label: 'Activity' }
  ];

  return (
    <div className="campaign-tabs">
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}