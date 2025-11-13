package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

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
@Table(name = "sponsorships")
public class Sponsorship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sponsorshipId;
    
    private LocalDate startDate;
    private LocalDate endDate;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal amountPerInterval;
    
    private String duration;
    private String paymentInterval;
    
    @Enumerated(EnumType.STRING)
    private SponsorshipStatus status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sponsor_email")
    private User sponsor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_donation_box_id")
    private AnimalDonationBox animalDonationBox;
}

enum SponsorshipStatus {
    ACTIVE, ENDED, CANCELLED
}