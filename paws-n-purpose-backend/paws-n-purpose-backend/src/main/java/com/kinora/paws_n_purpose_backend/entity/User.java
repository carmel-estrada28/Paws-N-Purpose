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
    private String email; // Email as primary key
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    
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
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserReward> rewards = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserBadge> badges = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Campaign> ownedCampaigns = new ArrayList<>();

    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL)
    private List<Donation> donations = new ArrayList<>();

    @OneToMany(mappedBy = "sponsor", cascade = CascadeType.ALL)
    private List<Sponsorship> sponsorships = new ArrayList<>();
    
    // Constructors
    public User() {}

    public User(String email, String password, UserRole role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
    // Getters and Setters
    // Remove setId(), use getEmail() and setEmail() instead
    
    // Getters and setters...
    
    // No more getId() and setId() methods
}

enum UserRole {
    INDIVIDUAL, ORGANIZATION, ADMIN
}