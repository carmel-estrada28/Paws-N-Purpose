import React, { useContext } from 'react';
import './SearchModal.css';

import { AuthContext } from '../Routes/AuthContext';

export default function SearchModal({
  isOpen,
  modalRef,
  modalStyle,
  campaigns,
  onCampaignSelect,
  navigate
}) {
  const { user } = useContext(AuthContext);

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
            <div className="empty-results">No donations found</div>
          ) : (
            campaigns.map((item) => (
              <button
                key={item.id}
                className="search-result-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (onCampaignSelect) {
                    onCampaignSelect(item.id);
                  } else {
                    if (user) {
                      navigate(`/user/donation-box/${item.id}`);
                    } else {
                      navigate(`/donation-box/${item.id}`);
                    }
                  }
                }}
              >
                <div className="result-left">
                  <div className="result-tag">Donation Box</div>
                  <div className="result-title" style={{ fontFamily: 'Cherry Bomb One', fontWeight: 700, fontSize: '1.1rem' }}>{item.title || item.name}</div>
                  <div className="result-sub">
                    ₱{item.amountRaised?.toLocaleString()} raised of ₱{item.goal?.toLocaleString()}
                  </div>
                </div>
                <div className="result-image">
                  <img src={item.image} alt={item.title || item.name} />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
