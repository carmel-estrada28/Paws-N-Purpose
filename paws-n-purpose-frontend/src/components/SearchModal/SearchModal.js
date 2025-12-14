import React from 'react';
import './SearchModal.css';

export default function SearchModal({
  isOpen,
  modalRef,
  modalStyle,
  campaigns,
  onCampaignSelect,
  navigate
}) {
  if (!isOpen || !modalStyle) {
    return null;
  }

  return (
    <div
      className="search-modal"
      ref={modalRef}
      role="dialog"
      aria-label="Search results"
      style={modalStyle}
    >
      <div className="search-modal-inner">
        <div className="search-results-list">
          {campaigns.length === 0 ? (
            <div className="empty-results">No campaigns found</div>
          ) : (
            campaigns.map((item) => (
              <button
                key={item.id}
                className="search-result-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onCampaignSelect(item.id);
                  navigate(`/campaign/${item.id}`);
                }}
              >
                <div className="result-left">
                  <div className="result-tag">Donation Box</div>
                  <div className="result-title">{item.name}</div>
                  <div className="result-sub">
                    ₱{item.amountRaised.toLocaleString()} raised of ₱
                    {item.goal.toLocaleString()}
                  </div>
                </div>
                <div className="result-image">
                  <img src={item.image} alt={item.name} />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
