package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;

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
@Table(name = "animal_donation_boxes")
public class AnimalDonationBox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationBoxId;
    
    private String animalPhoto;
    private String animalName;
    private String animalCondition;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal goalAmount;
    
    @Enumerated(EnumType.STRING)
    private AnimalBoxStatus status = AnimalBoxStatus.ACTIVE;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;
    
}

enum AnimalBoxStatus {
    ACTIVE, COMPLETED, CLOSED
}