package com.kinora.paws_n_purpose_backend.entity;

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
    private Boolean isNotifsEnabled = false;

    @CreationTimestamp
    private LocalDateTime createdAt;


    // Relations

    @OneToOne(mappedBy = "owner", cascade = CascadeType.ALL)
    private Wallet wallet;
    
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Campaign> ownedCampaigns = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<DonationBox> ownedDonationBoxes = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Individual individualProfile;

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

    public Long getId() { return userId; }
    public void setId(Long userId) { this.userId = userId; }


    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }


    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }


    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }


    public Boolean getIsAdmin() { return isAdmin; }
    public void setIsAdmin(Boolean isAdmin) { this.isAdmin = isAdmin; }


    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) {  this.profilePicture = profilePicture; }


    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }


    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }


    public Boolean getIsNotifsEnabled() { return isNotifsEnabled; }
    public void setIsNotifsEnabled(Boolean isNotifsEnabled) { this.isNotifsEnabled = isNotifsEnabled; }


    public LocalDateTime getCreatedAt() { return createdAt; }
    

    public Wallet getWallet() { return wallet; }
    public void setWallet(Wallet wallet) { this.wallet = wallet; } 


    public List<Campaign> getOwnedCampaigns() { return ownedCampaigns; }


    public List<DonationBox> getOwnedDonationBoxes() { return ownedDonationBoxes; }
    
    
    public Individual getIndividualProfile() { return individualProfile; }
    public void setIndividualProfile(Individual individualProfile) { this.individualProfile = individualProfile; }

    
    public Organization getOrganizationProfile() { return organizationProfile; }
    public void setOrganizationProfile(Organization organizationProfile) { this.organizationProfile = organizationProfile; }
}