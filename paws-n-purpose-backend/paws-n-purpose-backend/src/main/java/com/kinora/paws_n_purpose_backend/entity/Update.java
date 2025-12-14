package com.kinora.paws_n_purpose_backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "updates")
public class Update {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long updateId;

    private String photo;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @CreationTimestamp
    private LocalDateTime createdAt;


    // Relations
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_box_id")
    private DonationBox donationBox;
    
    
    //  getters, setters

    public void setUpdateId(Long updateId) {this.updateId = updateId;}
    public Long getUpdateId() {return updateId;}

    public void setPhoto(String photo) {this.photo = photo;}
    public String getPhoto() {return photo;}

    public void setMessage(String message) {this.message = message;}
    public String getMessage() {return message;}

    public LocalDateTime getCreatedAt() {return createdAt;}

    public void setDonationBox(DonationBox donationBox) {this.donationBox = donationBox;}
    public DonationBox getDonationBox() {return donationBox;}
}