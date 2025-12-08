package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.kinora.paws_n_purpose_backend.entity.enums.DonationStatus;

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
    private LocalDateTime paidAt;

    private String paymentProvider;

    private String paymentMethod;
    
    @Enumerated(EnumType.STRING)
    private DonationStatus status = DonationStatus.PENDING;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id")
    private User donor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_box_id")
    private DonationBox donationBox;
    
    // Constructors, getters, setters
}
