package com.kinora.paws_n_purpose_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.kinora.paws_n_purpose_backend.entity.enums.UserRole;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private UserRole role; // INDIVIDUAL, ORGANIZATION

    private Boolean isAdmin = false;    
    private String profilePicture;
    private String bio;
    private String contactNumber;
    
    
    @Column(precision = 10, scale = 2)
    private BigDecimal userWallet = BigDecimal.ZERO;

    private Boolean isNotifsEnabled = false;

    @CreationTimestamp
    private LocalDateTime createdAt;


    // Relations
    

        // User can start many campaigns identified by the owner field in Campaign
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Campaign> ownedCampaigns = new ArrayList<>();

        // User can do many donations identified by the donor field in Donation
    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL)
    private List<Donation> donations = new ArrayList<>();

        // User can have one individual profile
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Individual individualProfile;

        // User can have one organization profile
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Organization organizationProfile;
    
    // Constructors
    public User() {}

    public User(String email, String password, Boolean isAdmin) {
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    
    // Getters and Setters

        // for userId
    public Long getId() {
        return userId;
    }
    public void setId(Long userId) {
        this.userId = userId;
    }

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


        // for role
    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }


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

        // for datetime created
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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
    
        // for individualProfile
    public Individual getIndividualProfile() {
        return individualProfile;
    }
    public void setIndividualProfile(Individual individualProfile) {
        this.individualProfile = individualProfile;
    }

        // for organizationProfile
    public Organization getOrganizationProfile() {
        return organizationProfile;
    }
    public void setOrganizationProfile(Organization organizationProfile) {
        this.organizationProfile = organizationProfile;
    }
}