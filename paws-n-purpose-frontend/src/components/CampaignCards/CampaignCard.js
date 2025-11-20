import './CampaignCard.css';
import Button from '../Buttons/Button'; // ADD THIS
import { Link } from 'react-router-dom';

export default function CampaignCard({ campaign, onView, onDonate }) {
  const progress = Math.min((campaign.amountRaised / campaign.goal) * 100, 100);

  return (
    <div className="campaign-card-new">
      {/* Image Section */}
      <div className="campaign-image-new">
        <img src={campaign.image} alt={campaign.name} />
      </div>

      {/* Content Section */}
      <div className="campaign-content-new">
        <div className="campaign-header-new">
          <div className="campaign-title-section">
            <h3 className="campaign-title-new">{campaign.name}</h3>
            <p className="campaign-drive-name">{campaign.driveName}</p>
            <p className="campaign-days-left">{campaign.daysLeft} days left</p>
          </div>
          <button className="campaign-menu-btn" aria-label="More options">
            <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
              <circle cx="2" cy="2" r="2" fill="#053534" opacity="0.5"/>
              <circle cx="2" cy="8" r="2" fill="#053534" opacity="0.5"/>
              <circle cx="2" cy="14" r="2" fill="#053534" opacity="0.5"/>
            </svg>
          </button>
        </div>

        <div className="campaign-progress-new">
          <div className="progress-info">
            <span>₱{campaign.amountRaised.toLocaleString()} / ₱{campaign.goal.toLocaleString()}</span>
          </div>
          <div className="progress-bar-new">
            <div 
              className="progress-fill-new" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <p className="campaign-description-new">
          {campaign.description}
        </p>

        <div className="campaign-actions">
          {/* REPLACE THESE BUTTONS */}
          <Link to={""}>
          <Button
            type="button"
            text="View"
            onClick={onView}
            vPadding={0.5}
            hPadding={1.5}
            theme="pink semi-rounded"
            style={{ flex: 1 }}
          />
          </Link>

          <Link to={"/login"}>
          <Button
            type="button"
            text="Donate"
            onClick={onDonate}
            vPadding={0.5}
            hPadding={1.5}
            theme="transparent semi-rounded"
            style={{ 
              flex: 1,
              border: '2px solid #DD4391',
              color: '#DD4391'
            }}
          />
          </Link>
          
        </div>
      </div>
    </div>
  );
}