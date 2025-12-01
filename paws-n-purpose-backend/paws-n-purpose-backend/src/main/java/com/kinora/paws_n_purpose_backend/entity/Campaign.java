package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.kinora.paws_n_purpose_backend.entity.enums.CampaignType;

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
@Table(name = "campaigns")
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long campaignId;

    @Enumerated(EnumType.STRING)
    private CampaignType campaignType;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String coverPhoto;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal goalAmount;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal currentAmount = BigDecimal.ZERO;
    
    private LocalDate targetDate;
    
    @Enumerated(EnumType.STRING)
    private CampaignStatus status = CampaignStatus.ACTIVE;
    
    private Boolean acceptSponsors = false;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;
    
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private List<AnimalDonationBox> animalDonationBoxes = new ArrayList<>();
    
    @OneToMany(mappedBy = "campaign")
    private List<Donation> donations = new ArrayList<>();

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private List<Sponsorship> sponsorships = new ArrayList<>();
    
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private List<Update> updates = new ArrayList<>();
    
    // Constructors, getters, setters
}

enum CampaignStatus {
    ACTIVE, CLOSED, SUCCESSFUL, EXPIRED
}

