import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, PlusCircle as PlusCircleIcon, X } from 'lucide-react';
import Header from '../../components/Header/Header';
import DonationBox from '../../components/Projects/DonationBox';
import './AddDonationBoxes.css';

function AddDonationBoxes() {
  const navigate = useNavigate();
  
  // This would come from your state management or props in a real app
  const campaignData = {
    title: 'Help Marsha In Need!',
    description: 'Marsha Marsha Marsha Marsh',
    targetDate: '2024-12-31',
    goalAmount: 10000
  };

  const handleBack = () => {
    navigate('/create-campaign/step-1');
  };

  const handleNext = () => {
    // Navigate to the next step (Review & Publish)
    navigate('/create-campaign/step-3');
  };

  const handleCreateDonationBox = () => {
    console.log('Create new donation box');
    onclick=navigate('/create-donation-box')
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [addedBoxes, setAddedBoxes] = useState([]);

  // Shared donation boxes data - matches the structure used in MyProjects
  const existingDonationBoxes = [
    { id: 1, title: 'Dog Food Drive', amount: 10000, current: 7000, status: 'active', category: 'Active' },
    { id: 2, title: 'Vet Bills Fund', amount: 8000, current: 4500, status: 'active', category: 'Active' },
    { id: 3, title: 'Shelter Renovation', amount: 15000, current: 12000, status: 'active', category: 'Active' },
    { id: 4, title: 'Spay/Neuter Program', amount: 10000, current: 6000, status: 'active', category: 'Active' },
    { id: 5, title: 'Emergency Medical Fund', amount: 10000, current: 2500, status: 'draft', category: 'Drafts' },
    { id: 6, title: 'Winter Blankets Campaign', amount: 8000, current: 5000, status: 'active', category: 'Active' },
  ].filter(box => box.status === 'active'); // Only show active donation boxes

  const toggleBoxSelection = (boxId) => {
    setSelectedBoxes(prev => 
      prev.includes(boxId)
        ? prev.filter(id => id !== boxId)
        : [...prev, boxId]
    );
  };

  const handleAddSelectedBoxes = () => {
    const selectedBoxesData = existingDonationBoxes.filter(box => 
      selectedBoxes.includes(box.id) && 
      !addedBoxes.some(addedBox => addedBox.id === box.id)
    );
    
    setAddedBoxes(prev => [...prev, ...selectedBoxesData]);
    setIsModalOpen(false);
    setSelectedBoxes([]);
  };

  const handleDeleteBox = (boxId, e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    setAddedBoxes(prev => prev.filter(box => box.id !== boxId));
  };

  const handleAddExistingBox = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="add-donation-boxes">
      <Header withColor isLoggedIn isFixed />
      
      <div className="add-donation-boxes-content">
        <div className="add-donation-boxes-header">
          <button className="back-pill" onClick={handleBack}>
            <ArrowLeft size={16} /> Back
          </button>
          
          <div className="progress-steps" data-step="2">
            <div className="step-item completed">
              <div className="step-number">1</div>
              <span className="step-text">Campaign Details</span>
            </div>
            <div className="step-item active">
              <div className="step-number">2</div>
              <span className="step-text">Add Donation Boxes</span>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <span className="step-text">Review & Publish</span>
            </div>
            <div className="progress-line"></div>
          </div>
        </div>

        <div className="add-donation-boxes-card">
          <h1>Add Donation Boxes</h1>
          
          <div className="donation-boxes-grid">
            {/* Create Donation Box Card */}
            <div className="donation-box-card create-new" onClick={handleCreateDonationBox}>
              <div className="donation-box-icon">
                <Plus size={32} />
              </div>
              <h3>Create Donation Box</h3>
            </div>
            
            {/* Add From Existing Boxes Card */}
            <div className="donation-box-card add-existing" onClick={handleAddExistingBox}>
              <div className="donation-box-icon">
                <PlusCircleIcon size={32} />
              </div>
              <h3>Add From Existing Boxes</h3>
            </div>
            
            {/* Added donation boxes */}
            {addedBoxes.map((box) => (
              <div key={`added-${box.id}`} className="donation-box-card">
                <button 
                  className="delete-btn"
                  onClick={(e) => handleDeleteBox(box.id, e)}
                  aria-label="Remove donation box"
                >
                  <X size={14} />
                </button>
                <DonationBox 
                  donationBox={{
                    id: box.id,
                    title: box.title,
                    description: box.description || 'Help support this important cause with your donation.',
                    raised: box.current,
                    goal: box.amount,
                    status: 'active',
                    category: 'Donation Box',
                    image: box.image || 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg'
                  }}
                  onView={() => {}}
                  onDonate={() => {}}
                  myDonationBox={true}
                />
              </div>
            ))}
            
            {/* Empty placeholders (only show if there's space) */}
            {Array(Math.max(0, 8 - addedBoxes.length - 2)).fill().map((_, index) => (
              <div key={`empty-${index}`} className="donation-box-card empty"></div>
            ))}
          </div>
          
          <div className="form-actions">
            <button type="button" className="back-button" onClick={handleBack}>
              Back
            </button>
            <button type="button" className="next-button" onClick={handleNext}>
              Next: Review & Publish
            </button>
          </div>
        </div>
      </div>

      {/* Add Existing Donation Box Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="donation-box-modal">
            <div className="modal-header">
              <h3>Add Existing Donation Boxes</h3>
              <button onClick={() => setIsModalOpen(false)} className="close-button">
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="donation-boxes-list">
                {existingDonationBoxes.map(box => (
                  <div 
                    key={box.id} 
                    className={`donation-box-item ${selectedBoxes.includes(box.id) ? 'selected' : ''}`}
                    onClick={() => toggleBoxSelection(box.id)}
                  >
                    <div className="modal-donation-box">
                      <DonationBox 
                        donationBox={{
                          id: box.id,
                          title: box.title,
                          description: box.description || 'Help support this important cause with your donation.',
                          raised: box.current,
                          goal: box.amount,
                          status: 'active',
                          category: 'Donation Box',
                          image: box.image || 'https://i.pinimg.com/1200x/ed/09/16/ed0916a30e5d23e1c94c08dd8b8fb41f.jpg'
                        }}
                        onView={() => {}}
                        onDonate={() => {}}
                        myDonationBox={false}
                      />
                    </div>
                    <div className="box-checkbox">
                      <input 
                        type="checkbox" 
                        checked={selectedBoxes.includes(box.id)}
                        onChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedBoxes([]);
                }}
              >
                Cancel
              </button>
              <button 
                className="add-button"
                onClick={handleAddSelectedBoxes}
                disabled={selectedBoxes.length === 0}
              >
                Add Selected ({selectedBoxes.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddDonationBoxes;
