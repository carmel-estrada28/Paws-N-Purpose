package com.kinora.paws_n_purpose_backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.kinora.paws_n_purpose_backend.entity.enums.TransactionStatus;

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
@Table(name = "withdrawal_transactions")
public class WithdrawalTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long withdrawalTransactionId;

    private float amount;
    private String transactionReference;
    private TransactionStatus status = TransactionStatus.PENDING;
    
    @CreationTimestamp
    private LocalDateTime createdAt;


    // Relations

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

    @OneToOne
    @JoinColumn(name = "payment_method_id", nullable = false, unique = true)
    private PaymentMethod paymentMethod;


    // setters & getters

    public Long getDonationTransactionId() { return withdrawalTransactionId; }
    public void setDonationTransactionId(Long donationTransactionId) { this.withdrawalTransactionId = donationTransactionId; }

    public float getAmount() {return amount; }
    public void setAmount(float amount) { this.amount = amount;}

    public String getTransactionReference() { return transactionReference; }
    public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }

    public TransactionStatus getStatus() { return status;}
    public void setStatus(TransactionStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt;}

    public Wallet getWallet() {return wallet;}
    public void setWallet(Wallet wallet) {this.wallet = wallet;}
    
    public PaymentMethod getPaymentMethod() {return paymentMethod;}
    public void setPaymentMethod(PaymentMethod paymentMethod) {this.paymentMethod = paymentMethod;}
}
