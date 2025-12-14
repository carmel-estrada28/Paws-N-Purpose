// components/Updates/UpdatesList.js - UPDATED
import React from 'react';
import './UpdatesList.css';

export default function UpdatesList({ updates = [], ownerProfile }) {
  if (updates.length === 0) {
    return (
      <div className="no-updates">
        <p>No updates yet. Be the first to share news about this donation box!</p>
      </div>
    );
  }

  return (
    <div className="updates-list">
      {updates.map((update, idx) => (
        <div key={update.id} className="update-item">
          <div className="update-header">
            <div className="user-info">
              <div className="user-avatar">
                <img 
                  src={ownerProfile?.avatar}
                  alt={ownerProfile?.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://ui-avatars.com/api/?name=' + (ownerProfile?.name || 'User') + '&background=DD4391&color=fff';
                  }}
                />
              </div>
              <div className="user-details">
                <span className="user-name">{ownerProfile?.name}</span>
                <span className="update-date">{update.datePosted}</span>
              </div>
            </div>
          </div>
          <div className="update-content">
            {update.content && <p>{update.content}</p>}
            {update.image && (
              <div className="update-image-wrapper">
                <img src={update.image} alt="update visual" className="update-image" />
              </div>
            )}
          </div>
          {idx !== updates.length - 1 && <hr className="update-divider" />}
        </div>
      ))}
    </div>
  );
}