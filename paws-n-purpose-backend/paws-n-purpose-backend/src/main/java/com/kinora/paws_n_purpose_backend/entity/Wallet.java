package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "wallets")
public class Wallet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walletId;

    
    @Column(precision = 10, scale = 2)
    private BigDecimal balance = BigDecimal.ZERO;



    // Relations
    
    @OneToOne
    @JoinColumn(name = "owner_id", nullable = false, unique = true)
    private User owner;

    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL)
    private List<DonationTransaction> donationTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL)
    private List<WithdrawalTransaction> withdrawalTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL)
    private List<PaymentMethod> paymentMethods = new ArrayList<>();


    // setters & getters 

    public void setWalletId(Long walletId) {this.walletId = walletId;}
    public Long getWalletId() {return walletId;}

    public void setBalance(BigDecimal balance) {this.balance = balance;}
    public BigDecimal getBalance() {return balance;}

    public void setOwner(User owner) { this.owner = owner; }
    public User getOwner() {return owner;}

    
    public List<DonationTransaction> getDonationTransactions() {return donationTransactions;}


    public List<WithdrawalTransaction> getWithdrawalTransactions() {return withdrawalTransactions;}

    
    public List<PaymentMethod> getPaymentMethods() {return paymentMethods;}

}
