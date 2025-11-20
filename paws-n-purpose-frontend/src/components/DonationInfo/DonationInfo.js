import React from 'react';
import Button from '../Buttons/Button';
import './DonationInfo.css';
import { Link } from 'react-router-dom';

export default function DonationInfo({ campaign, onDonate, onShare, processing }) {
  const progress = Math.min((campaign.amountRaised / campaign.goal) * 100, 100);

  return (
    <div className="donation-info">
      <div className="donation-card">
        {/* Amount Raised */}
        <div className="amount-raised">
          <span className="amount">₱{campaign.amountRaised.toLocaleString()}</span>
          <span className="reached-label">reached!</span>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{progress.toFixed(0)}%</span>
            <span className="stat-label">of {campaign.goal.toLocaleString()} goal!</span>
          </div>
          <div className="stat">
            <span className="stat-value">250</span>
            <span className="stat-label">contributions</span>
          </div>
          <div className="stat">
            <span className="stat-value">{campaign.daysLeft}</span>
            <span className="stat-label">days left</span>
          </div>
        </div>

        {/* Badge Incentive */}
        <div className="badge-incentive">
          <p className="incentive-text">
            🐾 <strong>Earn a "Sponsor of {campaign.name}" badge!</strong>
          </p>
          <p className="incentive-subtext">
            Show your support and get recognized on your profile
          </p>
        </div>

        {/* Donate Button */}
        <div className="button-container full-width">
            <Link to={"/login"}>
            <Button
                type="button"
                text={processing ? "Processing..." : "Donate!"}
                onClick={onDonate}
                vPadding={1}
                hPadding={2}
                theme="pink semi-rounded"
                disabled={processing}
            />          
            </Link>
        </div>

        {/* Sponsorship Button */}
        <div className="button-container full-width">
          <Button
            type="button"
            text="Become a Sponsor 💝"
            onClick={onDonate}
            vPadding={1}
            hPadding={2}
            theme="transparent semi-rounded"
          />
        </div>

        {/* Share Text */}
        <p className="share-text">
          -- or if you can't donate --
        </p>

        {/* Share Button */}
        <div className="button-container full-width">
          <Button
            type="button"
            text="Share!"
            onClick={onShare}
            vPadding={1}
            hPadding={2}
            theme="pink semi-rounded"
          />
        </div>
      </div>
    </div>
  );
}