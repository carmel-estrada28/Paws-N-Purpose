package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "donations")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationId;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal donatedAmount;
    
    @CreationTimestamp
    private LocalDateTime dateTime;
    
    @Enumerated(EnumType.STRING)
    private DonationStatus status = DonationStatus.PENDING;
    
    private String paymentMethod;
    
    private Integer pointsEarned;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_email")
    private User donor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;
    
    // Constructors, getters, setters
}

enum DonationStatus {
    PENDING, COMPLETED, FAILED, REFUNDED
}