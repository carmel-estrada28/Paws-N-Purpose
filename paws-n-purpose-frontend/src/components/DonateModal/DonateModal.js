import React, { useState } from 'react';
import Button from '../Buttons/Button';
import './DonateModal.css';

const DonateModal = ({ isOpen, onClose, donationBox }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [step, setStep] = useState('amount'); // 'amount', 'payment-info', or 'review'
  const [isFirstDonation, setIsFirstDonation] = useState(true); // Mock: would come from user data
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
    onlineBankProvider: ''
  });

  if (!isOpen || !donationBox) return null;

  const handleDonateClick = () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    // If first donation and not using GCash, go to payment info step
    if (isFirstDonation && paymentMethod !== 'gcash') {
      setStep('payment-info');
    } else {
      setStep('review');
    }
  };

  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const validatePaymentInfo = () => {
    if (paymentMethod === 'card') {
      if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryMonth || !paymentInfo.expiryYear || !paymentInfo.cvv) {
        alert('Please fill in all card details');
        return false;
      }
    } else if (paymentMethod === 'bank') {
      if (!paymentInfo.bankName || !paymentInfo.accountNumber || !paymentInfo.accountName) {
        alert('Please fill in all bank details');
        return false;
      }
    } else if (paymentMethod === 'gcash') {
      if (!paymentInfo.onlineBankProvider) {
        alert('Please select an online bank provider');
        return false;
      }
    }
    return true;
  };
  
  const handlePaymentInfoSubmit = () => {
    if (validatePaymentInfo()) {
      setStep('review');
    }
  };

  const handleConfirmDonate = () => {
    console.log('Donation confirmed:', {
      amount: donationAmount,
      paymentMethod,
      paymentInfo: paymentInfo,
      donationBoxId: donationBox.id
    });
    // Here you would integrate with actual payment processing
    alert(`Successfully donated ₱${donationAmount} to ${donationBox.title}!`);
    handleClose();
  };

  const handleClose = () => {
    setDonationAmount('');
    setPaymentMethod('gcash');
    setPaymentInfo({
      cardNumber: '',
      cardName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      bankName: '',
      accountNumber: '',
      accountName: '',
      onlineBankProvider: ''
    });
    setStep('amount');
    onClose();
  };

  const progressPercent = donationBox.fundsRaised && donationBox.goalAmount 
    ? (donationBox.fundsRaised / donationBox.goalAmount) * 100 
    : 0;

  return (
    <div className="donate-modal-overlay" onClick={handleClose}>
      <div className="donate-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="donate-modal-close" onClick={handleClose}>
          ✕
        </button>

        {step === 'amount' ? (
          <>
            {/* Modal Header with Image and Info */}
            <div className="donate-modal-header">
              <div className="donate-modal-image-section">
                <img 
                  src={donationBox.donationBoxPhoto} 
                  alt={donationBox.title}
                  className="donate-modal-image"
                />
              </div>
              
              <div className="donate-modal-info">
                <h2 className="donate-modal-title">{donationBox.title}</h2>
                
                {/* Progress Bar */}
                <div className="donate-modal-progress-container">
                  <div className="donate-modal-progress-bar">
                    <div 
                      className="donate-modal-progress-fill"
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    />
                  </div>
                  <div className="donate-modal-progress-text">
                    <span className="donate-raised">₱{donationBox.fundsRaised?.toLocaleString() || '0'}</span>
                    <span className="donate-goal">of ₱{donationBox.goalAmount?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Amount Section */}
            <div className="donate-modal-content">
              <div className="donation-amount-section">
                <label className="donation-label">Donation Amount (₱)</label>
                <div className="amount-input-group">
                  <span className="currency-symbol">₱</span>
                  <input 
                    type="number" 
                    className="amount-input"
                    placeholder="0.00"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    min="1"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="quick-amounts">
                <button 
                  className="quick-amount-btn"
                  onClick={() => setDonationAmount('100')}
                >
                  ₱100
                </button>
                <button 
                  className="quick-amount-btn"
                  onClick={() => setDonationAmount('500')}
                >
                  ₱500
                </button>
                <button 
                  className="quick-amount-btn"
                  onClick={() => setDonationAmount('1000')}
                >
                  ₱1,000
                </button>
              </div>

              {/* Payment Method Section */}
              <div className="payment-method-section">
                <label className="donation-label">Payment Method</label>
                
                <div className="payment-options">
                  <label className="payment-option">
                    <input 
                      type="radio"
                      name="payment"
                      value="gcash"
                      checked={paymentMethod === 'gcash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label-text">GCash</span>
                  </label>
                  
                  <label className="payment-option">
                    <input 
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label-text">Debit/Credit Card</span>
                  </label>
                  
                  <label className="payment-option">
                    <input 
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label-text">Bank Transfer</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="donate-modal-actions">
              <Button
                type="button"
                text="Cancel"
                theme="outline semi-rounded"
                onClick={handleClose}
                hPadding={2}
                vPadding={0.75}
              />
              <Button
                type="button"
                text={`Donate ₱${donationAmount || '0'}`}
                theme="pink semi-rounded"
                onClick={handleDonateClick}
                hPadding={2}
                vPadding={0.75}
              />
            </div>
          </>
        ) : step === 'payment-info' ? (
          <>
            {/* Payment Information Step */}
            <div className="donate-modal-payment-info">
              <h2 className="review-title">Add Payment Information</h2>
              <p className="payment-info-subtitle">Save your {paymentMethod === 'card' ? 'card' : paymentMethod === 'bank' ? 'bank account' : 'online bank'} details for this donation</p>
              
              {paymentMethod === 'card' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                      maxLength="19"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={paymentInfo.cardName}
                      onChange={(e) => handlePaymentInfoChange('cardName', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Expiry Month</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="MM"
                        value={paymentInfo.expiryMonth}
                        onChange={(e) => handlePaymentInfoChange('expiryMonth', e.target.value)}
                        maxLength="2"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Expiry Year</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="YY"
                        value={paymentInfo.expiryYear}
                        onChange={(e) => handlePaymentInfoChange('expiryYear', e.target.value)}
                        maxLength="2"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                        maxLength="3"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'bank' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label className="form-label">Bank Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g., BPI, BDO, Metrobank"
                      value={paymentInfo.bankName}
                      onChange={(e) => handlePaymentInfoChange('bankName', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Account Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your account number"
                      value={paymentInfo.accountNumber}
                      onChange={(e) => handlePaymentInfoChange('accountNumber', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Account Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Name on the account"
                      value={paymentInfo.accountName}
                      onChange={(e) => handlePaymentInfoChange('accountName', e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'gcash' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label className="form-label">Online Bank Provider</label>
                    <select
                      className="form-input"
                      value={paymentInfo.onlineBankProvider}
                      onChange={(e) => handlePaymentInfoChange('onlineBankProvider', e.target.value)}
                    >
                      <option value="">Select a provider...</option>
                      <option value="gcash">GCash</option>
                      <option value="paymaya">PayMaya</option>
                      <option value="grab-pay">Grab Pay</option>
                      <option value="coins-ph">Coins.ph</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment Info Actions */}
            <div className="donate-modal-actions">
              <Button
                type="button"
                text="Go Back"
                theme="outline semi-rounded"
                onClick={() => setStep('amount')}
                hPadding={2}
                vPadding={0.75}
              />
              <Button
                type="button"
                text="Continue"
                theme="pink semi-rounded"
                onClick={handlePaymentInfoSubmit}
                hPadding={2}
                vPadding={0.75}
              />
            </div>
          </>
        ) : (
          <>
            {/* Review Step */}
            <div className="donate-modal-review">
              <h2 className="review-title">Transfer Summary</h2>
              
              <div className="review-box">
                <div className="review-item">
                  <span className="review-label">Amount</span>
                  <span className="review-value">₱{parseFloat(donationAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="review-item">
                  <span className="review-label">Payment Method</span>
                  <span className="review-value">
                    {paymentMethod === 'gcash' && 'GCash'}
                    {paymentMethod === 'card' && 'Debit/Credit Card'}
                    {paymentMethod === 'bank' && 'Bank Transfer'}
                  </span>
                </div>

                <div className="review-item">
                  <span className="review-label">Donation To</span>
                  <span className="review-value">{donationBox.title}</span>
                </div>
              </div>

              <div className="review-warning">
                <span className="warning-icon">⚠</span>
                <span className="warning-text">Please review your transfer details</span>
                <span className="warning-subtext">Make sure all information is correct before confirming</span>
              </div>
            </div>

            {/* Review Actions */}
            <div className="donate-modal-actions">
              <Button
                type="button"
                text="Go Back"
                theme="outline semi-rounded"
                onClick={() => setStep('amount')}
                hPadding={2}
                vPadding={0.75}
              />
              <Button
                type="button"
                text="Confirm Transfer"
                theme="pink semi-rounded"
                onClick={handleConfirmDonate}
                hPadding={2}
                vPadding={0.75}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonateModal;
