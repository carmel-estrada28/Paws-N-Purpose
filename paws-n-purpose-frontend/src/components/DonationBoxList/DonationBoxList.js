import './DonationBoxList.css';

const DonationBoxList = ({ donationBoxes }) => {
  if (!donationBoxes || donationBoxes.length === 0) {
    return (
      <div className="no-boxes-message">
        No donation boxes added yet.
      </div>
    );
  }

  return (
    <div className="donation-boxes-container">
      {donationBoxes.map((box) => (
        <div key={box.id} className="donation-box-card-item">
          {/* Box Image or Placeholder */}
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
          </div>
          
          {/* Box Info */}
          <div className="donation-box-card-info">
            <h3 className="donation-box-card-name">{box.name}</h3>
            <p className="donation-box-card-condition">{box.condition}</p>
            
            {/* Goal Amount */}
            <div className="donation-box-card-goal">
              <span className="goal-label">Goal:</span>
              <span className="goal-amount">₱{parseFloat(box.goalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationBoxList;