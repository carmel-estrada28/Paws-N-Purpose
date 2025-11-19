
import './CampaignCard.css';

export default function CampaignCard({ campaign, onView, onDonate }) {
  const progress = (campaign.amountRaised / campaign.goal) * 100;

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
          <button className="campaign-menu-btn">
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
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        <p className="campaign-description-new">
          {campaign.description}
        </p>

        <div className="campaign-actions">
          <button className="view-btn" onClick={onView}>
            View
          </button>
          <button className="donate-btn-outline" onClick={onDonate}>
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}