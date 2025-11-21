package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User {
    @Id
    private String email;
    
    @Column(nullable = false)
    private String password;
    

    private Boolean isAdmin = false;    
    private String profilePicture;
    private String bio;
    private String contactNumber;
    
    private Integer rewardPoints = 0;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal userWallet = BigDecimal.ZERO;

    private Boolean isNotifsEnabled = false;
    private Boolean is2FAEnabled = false;

    @CreationTimestamp
    private LocalDateTime createdAt;


    // Relations
    
        // User can have many rewards identified by the user field in Reward
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserReward> rewards = new ArrayList<>();
    
        // User can have many badges identified by the user field in UserBadge
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserBadge> badges = new ArrayList<>();

        // User can start many campaigns identified by the owner field in Campaign
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Campaign> ownedCampaigns = new ArrayList<>();

        // User can do many donations identified by the donor field in Donation
    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL)
    private List<Donation> donations = new ArrayList<>();

        // User can support many sponsorships identified by the sponsor field in Sponsorship
    @OneToMany(mappedBy = "sponsor", cascade = CascadeType.ALL)
    private List<Sponsorship> sponsorships = new ArrayList<>();
    
    // Constructors
    public User() {}

    public User(String email, String password, Boolean isAdmin) {
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    
    // Getters and Setters

        // for email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

        // for password
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

        // for isAdmin
    public Boolean getIsAdmin() {
        return isAdmin;
    }
    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

        // for profile picture
    public String getProfilePicture() {
        return profilePicture;
    }
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

        // for bio
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }

        // for contact number
    public String getContactNumber() {
        return contactNumber;
    }
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

        // for reward points
    public Integer getRewardPoints() {
        return rewardPoints;
    }
    public void setRewardPoints(Integer rewardPoints) {
        this.rewardPoints = rewardPoints;
    }

        // for user wallet
    public BigDecimal getUserWallet() {
        return userWallet;
    }
    public void setUserWallet(BigDecimal userWallet) {
        this.userWallet = userWallet;
    }

        // for isNotifsEnabled
    public Boolean getIsNotifsEnabled() {
        return isNotifsEnabled;
    }
    public void setIsNotifsEnabled(Boolean isNotifsEnabled) {
        this.isNotifsEnabled = isNotifsEnabled;
    }

        // for is2FAEnabled
    public Boolean getIs2FAEnabled() {
        return is2FAEnabled;
    }
    public void setIs2FAEnabled(Boolean is2FAEnabled) {
        this.is2FAEnabled = is2FAEnabled;
    }

        // for datetime created
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

        // for rewards
    public List<UserReward> getRewards() {
        return rewards;
    }
    public void setRewards(List<UserReward> rewards) {
        this.rewards = rewards;
    }

        // for badges
    public List<UserBadge> getBadges() {
        return badges;
    }
    public void setBadges(List<UserBadge> badges) {
        this.badges = badges;
    }

        // for ownedCampaigns
    public List<Campaign> getOwnedCampaigns() {
        return ownedCampaigns;
    }
    public void setOwnedCampaigns(List<Campaign> ownedCampaigns) {
        this.ownedCampaigns = ownedCampaigns;
    }

        // for donations
    public List<Donation> getDonations() {
        return donations;
    }
    public void setDonations(List<Donation> donations) {
        this.donations = donations;
    }

        // for sponsorships
    public List<Sponsorship> getSponsorships() {
        return sponsorships;
    }
    public void setSponsorships(List<Sponsorship> sponsorships) {
        this.sponsorships = sponsorships;
    }
}