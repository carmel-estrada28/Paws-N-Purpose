// components/CampaignInfoBar/CampaignInfoBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CampaignInfoBar.css';

export default function CampaignInfoBar({ campaign }) {
  const navigate = useNavigate();
  if (!campaign) return null;
  return (
    <div className="campaign-info-bar">
      <div className="campaign-info-bar-left">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#053534" strokeWidth="2" fill="#EAEF9F" />
          <path d="M12 8v4l2 2" stroke="#053534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Part of campaign: <b>({campaign.name})</b>
      </div>
      <button
        className="campaign-info-bar-btn"
        onClick={() => navigate(`/campaign/${campaign.id}`)}
      >
        View Campaign &rarr;
      </button>
    </div>
  );
}
