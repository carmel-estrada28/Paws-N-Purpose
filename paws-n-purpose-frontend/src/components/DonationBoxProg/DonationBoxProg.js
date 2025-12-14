// components/DonationBoxProg/DonationBoxProg.js - UPDATED TO MATCH IMAGE
import React from 'react';
import Button from '../Buttons/Button';
import './DonationBoxProg.css';

export default function DonationBoxProg({ 
  donationBox, 
  onDonate, 
  onShare, 
  onSave, 
  onEdit,
  isOwner = false,
  isAuthenticated = false
}) {
  const amountRaised = donationBox.amountRaised || 0;
  const goal = donationBox.goal || 0;
  const progress = goal > 0 ? Math.min((amountRaised / goal) * 100, 100) : 0;
  const totalDonors = donationBox.totalDonors || 100;
  const lastDonation = donationBox.lastDonation || 'No donations yet';

  // Handle save click - redirect to login if not authenticated
  const handleSaveClick = () => {
    if (isAuthenticated) {
      if (onSave) {
        onSave();
      } else {
        console.log('Save donation box');
      }
    } else {
      // For non-authenticated users, save button should trigger login
      if (onSave) {
        onSave(); // This should navigate to login
      }
    }
  };

  return (
    <aside className="donation-box-prog-card">
      <h3 className="donation-box-prog-title">Donation Box Progress</h3>

      {/* Amount Raised */}
      <div className="donation-box-amount-row">
        <div className="donation-box-amount-item">
          <span className="label">₱{amountRaised.toLocaleString()} raised</span>
        </div>

              {/* Progress Bar */}
      <div className="donation-box-progress-section">
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
        
        {/* Goal and Percentage Row */}
        <div className="donation-box-goal-percentage-row">
          <span className="goal-label">₱{goal.toLocaleString()} goal</span>
          <span className="percentage-label">{Math.round(progress)}%</span>
        </div>
      </div>



      {/* Donate Now Button */}
      <div className="donate-now-section">
        <Button 
          text="Donate Now" 
          onClick={onDonate} 
          theme="pink semi-rounded" 
          height="2.75rem"  
          style={{ width: '100%' }}
        />
      </div>

      {/* Share and Save Buttons */}
      <div className="share-save-buttons">
        <Button 
          text="Share" 
          onClick={onShare} 
          theme="pink semi-rounded"
          height="2.75rem"
          style={{ 
            flex: 1,
            border: '2px solid #DD4391',
            color: '#DD4391'
          }}
        />
        
        {isOwner ? (
          // Edit Button for Owner
          <Button 
            text="Edit" 
            onClick={onEdit} 
            theme="pink semi-rounded"
            height="2.75rem"
            style={{ 
              flex: 1,
              border: '2px solid #78B96C',
              color: '#78B96C'
            }}
          />
        ) : (
          // Save Button for Non-Owners
          <Button 
            text="Save" 
            onClick={handleSaveClick} 
            theme="pink semi-rounded"
            height="2.75rem"
            style={{ 
              flex: 1,
              border: '2px solid #78B96C',
              color: '#78B96C'
            }}
          />
        )}
      </div>

      {/* Stats Section */}
      <div className="donation-box-stats">
        <div className="donation-box-stat-row">
          <span className="stat-label">Last Donation</span>
          <span className="stat-value">{lastDonation}</span>
        </div>
        <div className="donation-box-stat-row">
          <span className="stat-label">Total Donors</span>
          <span className="stat-value">{totalDonors} people</span>
        </div>
      </div>
    </aside>
  );
}