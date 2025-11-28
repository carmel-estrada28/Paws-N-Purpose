package com.kinora.paws_n_purpose_backend.entity;

import java.time.LocalDateTime;

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
@Table(name = "user_rewards")
public class UserReward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rewardId;
    
    private LocalDateTime dateTimeRedeemed;
    
    @Enumerated(EnumType.STRING)
    private RewardStatus status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    // Constructors, getters, setters
}

enum RewardStatus {
    AVAILABLE, REDEEMED, EXPIRED
}