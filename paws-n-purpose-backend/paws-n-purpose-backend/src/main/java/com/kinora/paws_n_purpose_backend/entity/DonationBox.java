package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.kinora.paws_n_purpose_backend.entity.enums.ProjectStatus;

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
    private BigDecimal fundsRaised = BigDecimal.ZERO;
    
    @Enumerated(EnumType.STRING)
    private ProjectStatus status = ProjectStatus.ACTIVE;

    @CreationTimestamp
    private LocalDateTime createdAt;
    
    
    // Relations
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "donationBox", cascade = CascadeType.ALL)
    private List<DonationTransaction> donationTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "donationBox", cascade = CascadeType.ALL)
    private List<Update> updates = new ArrayList<>();


    // setters & getters 

    public void setDonationBoxId( Long donationBoxId ) { this.donationBoxId = donationBoxId; }
    public Long getDonationBoxId() { return donationBoxId; }


    public void setDonationBoxPhoto( String donationBoxPhoto ) { this.donationBoxPhoto = donationBoxPhoto; }
    public String getDonationBoxPhoto() {return donationBoxPhoto;}

    
    public void setTitle(String title) {this.title = title;}
    public String getTitle() {return title;}

    public void setDescription(String description) {this.description = description; }
    public String getDescription() {return description;}


    public void setGoalAmount(BigDecimal goalAmount) {this.goalAmount = goalAmount;}
    public BigDecimal getGoalAmount() {return goalAmount;}


    public void setFundsRaised(BigDecimal fundsRaised) {this.fundsRaised = fundsRaised; }
    public BigDecimal getFundsRaised() { return fundsRaised; }
    

    public void setCampaign(Campaign campaign) { this.campaign = campaign; }
    public Campaign getCampaign() {return campaign;}


    public void setOwner(User owner) {this.owner = owner;}
    public User getOwner() {return owner;}

    
    public List<DonationTransaction> getDonationTransactions() { return donationTransactions; }


    public List<Update> getUpdates() {return updates;}


    public LocalDateTime getCreatedAt() {return createdAt;}

}