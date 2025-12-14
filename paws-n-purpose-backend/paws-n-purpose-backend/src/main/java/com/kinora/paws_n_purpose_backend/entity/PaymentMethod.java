package com.kinora.paws_n_purpose_backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_methods")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentMethodId;

    private String provider;
    private String accountIdentifier;
    private String expiryMonth;
    private String expiryYear;
    private boolean isDefault;
    
    @CreationTimestamp
    private LocalDateTime createdAt;


    // Relations 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

    @OneToOne
    @JoinColumn(name = "withdrawal_transaction_id", nullable = false, unique = true)
    private WithdrawalTransaction withdrawalTransaction;

    @OneToOne
    @JoinColumn(name = "donation_transaction_id", nullable = false, unique = true)
    private DonationTransaction donationTransaction;


    // setters & getters

    public Long getPaymentMethodId() { return paymentMethodId; }
    public void setPaymentMethodId(Long paymentMethodId) { this.paymentMethodId = paymentMethodId; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider;}

    public String getAccountIdentifier() { return accountIdentifier; }
    public void setAccountIdentifier(String accountIdentifier) { this.accountIdentifier = accountIdentifier; }

    public String getExpiryMonth() { return expiryMonth;}
    public void setExpiryMonth(String expiryMonth) { this.expiryMonth = expiryMonth;}

    public String getExpiryYear() { return expiryYear;}
    public void setExpiryYear(String expiryYear) { this.expiryYear = expiryYear;}

    public boolean isDefault() { return isDefault; }
    public void setDefault(boolean isDefault) { this.isDefault = isDefault;}
    
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setWallet(Wallet wallet ) {this.wallet = wallet;}
    public Wallet getWallet() {return wallet;}

    public void setWithdrawalTransaction(WithdrawalTransaction withdrawalTransaction) {this.withdrawalTransaction = withdrawalTransaction;}
    public WithdrawalTransaction getWithdrawalTransaction() {return withdrawalTransaction;}

    public void setDonationTransaction(DonationTransaction donationTransaction) {this.donationTransaction = donationTransaction;}
    public DonationTransaction getDonationTransaction() {return donationTransaction;}

}
