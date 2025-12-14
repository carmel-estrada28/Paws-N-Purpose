// components/DonationBoxList/DonationBoxList.js - COMPLETE UPDATED
import Button from '../Buttons/Button';
import './DonationBoxList.css';

const DonationBoxList = ({ donationBoxes, onViewBox }) => { // ADDED onViewBox prop
  if (!donationBoxes || donationBoxes.length === 0) {
    return (
      <div className="no-boxes-message">
        No donation boxes added yet.
      </div>
    );
  }

  return (
    <div className="donation-boxes-container">
      {donationBoxes.map((box) => {
        const goalAmount = parseFloat(box.goalAmount) || 0;
        const amountRaised = box.amountRaised || Math.floor(goalAmount * 0.7);
        const progress = goalAmount > 0 ? Math.min((amountRaised / goalAmount) * 100, 100) : 0;

        return (
        <div key={box.id} className="donation-box-card-item">
          {/* Box Image with Name Overlay */}
          <div className="donation-box-image-container">
            {box.image ? (
              <img 
                src={box.image} 
                alt={box.name} 
                className="donation-box-card-image"
              />
            ) : (
              <div className="donation-box-image-placeholder">
                🐾
              </div>
            )}
            <div className="donation-box-name-overlay">{box.name}</div>
          </div>
          
          {/* Box Info */}
          <div className="donation-box-card-info">
            {/* Amount Raised / Goal */}
            <div className="donation-box-amount">
              ₱{amountRaised.toLocaleString()} / ₱{goalAmount.toLocaleString()}
            </div>

            {/* Progress Bar */}
            <div className="donation-box-progress-track">
              <div className="donation-box-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            {/* View Button - UPDATED WITH onClick */}
            <Button 
              text="View" 
              theme="pink semi-rounded" 
              height="2.75rem" 
              style={{ width: '100%' }}
              onClick={() => onViewBox && onViewBox(box)} // ADDED THIS LINE
            />
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default DonationBoxList;