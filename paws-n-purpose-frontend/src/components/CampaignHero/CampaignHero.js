import React from 'react';
import './CampaignHero.css';

export default function CampaignHero({ image, tag, title, subtitle }) {
  return (
    <div className="campaign-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="campaign-hero-overlay">
        <div className="campaign-hero-inner">
          {tag && <div className="campaign-hero-tag">{tag}</div>}
          <h1 className="campaign-hero-title">{title}</h1>
          {subtitle && <p className="campaign-hero-sub">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
