package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "donation_boxes")
public class DonationBox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationBoxId;
    
    private String donationBoxPhoto;
    private String title;
    private String description;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal goalAmount;

    @Column(precision = 10, scale = 2)
    private BigDecimal fundsRaised;
    
    @Enumerated(EnumType.STRING)
    private AnimalBoxStatus status = AnimalBoxStatus.ACTIVE;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "donationBox", cascade = CascadeType.ALL)
    private List<Donation> donations = new ArrayList<>();

    @OneToMany(mappedBy = "donationBox", cascade = CascadeType.ALL)
    private List<Update> updates = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime postedOn;
}

enum AnimalBoxStatus {
    ACTIVE, COMPLETED, CLOSED
}