// components/DonationInfo/DonationInfo.jsx
import React from 'react';
import Button from '../Buttons/Button';
import './DonationInfo.css';

export default function DonationInfo({ 
  campaign, 
  onShare, 
  onSave,      
  onEdit,      
  isOwner = false,  
  isAuthenticated = false  
}) {
  const amountRaised = campaign.amountRaised || 0;
  const goal = campaign.goal || 0;
  const progress = goal > 0 ? Math.min((amountRaised / goal) * 100, 100) : 0;
  const donationBoxesCount = (campaign.donationBoxes && campaign.donationBoxes.length) || 0;
  const totalDonors = campaign.totalDonors || 100;
  const daysLeft = campaign.daysLeft ?? 0;

  // Handle save click - redirect to login if not authenticated
  const handleSaveClick = () => {
    if (isAuthenticated) {
      if (onSave) {
        onSave();
      } else {
        console.log('Save campaign');
      }
    } else {
      // For non-authenticated users, save button should trigger login
      // We'll handle this in ViewCampaign component via onSave prop
      if (onSave) {
        onSave(); // This should navigate to login
      }
    }
  };

  return (
    <aside className="donation-info-card">
      <h3 className="donation-info-title">Campaign Progress</h3>

      <div className="donation-summary">
        <div className="raised">₱{amountRaised.toLocaleString()} raised</div>

        <div className="progress-row">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-percent">{Math.round(progress)}%</div>
        </div>

        <div className="goal-row">₱{goal.toLocaleString()} goal</div>
      </div>

      <hr className="donation-divider" />

      <div className="donation-stats">
        <div className="donation-stat">
          <div className="label">Donation Boxes</div>
          <div className="value">{donationBoxesCount}</div>
        </div>
        <div className="donation-stat">
          <div className="label">Total Donors</div>
          <div className="value">{totalDonors} people</div>
        </div>
        <div className="donation-stat">
          <div className="label">Days Remaining</div>
          <div className="value">{daysLeft} days</div>
        </div>
      </div>

      {/* Owner Notice - Only for campaign owner */}
      {isOwner && (
        <div className="owner-notice">
          <div className="owner-badge">
            <span className="badge-icon">👑</span>
            <span className="badge-text">Campaign Owner</span>
          </div>
          <p className="owner-message">
            You created this campaign. You can edit it or share it with others.
          </p>
        </div>
      )}

      <div className="donation-actions">
        {/* Share Button - Always visible */}
        <Button 
          text="Share" 
          onClick={onShare} 
          theme="pink semi-rounded" 
          height="2.75rem"  
          style={{ flex: 1 }}
        />
        
        {/* Conditional Button - Save for non-owners, Edit for owner */}
        {isOwner ? (
          // Edit Button for Owner
          <Button 
            text="Edit" 
            onClick={onEdit} 
            theme="teal semi-rounded"
            height="2.75rem"
          />
        ) : (
          // Save Button for Non-Owners
          <Button 
            text="Save" 
            onClick={handleSaveClick} 
            theme="pink semi-rounded" 
            height="2.75rem"
          />
        )}
      </div>
    </aside>
  );
}