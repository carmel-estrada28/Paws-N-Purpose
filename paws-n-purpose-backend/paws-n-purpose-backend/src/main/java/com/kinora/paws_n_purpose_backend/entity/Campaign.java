package com.kinora.paws_n_purpose_backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.kinora.paws_n_purpose_backend.entity.enums.CampaignStatus;

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
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String coverPhoto;
    
    private LocalDate targetDate;
    
    @Enumerated(EnumType.STRING)
    private CampaignStatus status = CampaignStatus.ACTIVE;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;
    
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private List<DonationBox> animalDonationBoxes = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime postedOn;
    
    // Constructors, getters, setters
}
