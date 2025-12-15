package com.kinora.paws_n_purpose_backend.dto;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

public class DonationBoxCreationDTO {
    private String title;
    private String description;
    private BigDecimal goalAmount;
    private MultipartFile photo;
    private String photoUrl;

    //setters getters

    public void setTitle(String title) {this.title = title;}
    public String getTitle() {return title;}

    public void setDescription(String description) {this.description = description; }
    public String getDescription() {return description;}

    public void setGoalAmount(BigDecimal goalAmount) {this.goalAmount = goalAmount;}
    public BigDecimal getGoalAmount() {return goalAmount;}

    public void setPhoto(MultipartFile photo) {this.photo = photo;}
    public MultipartFile getPhoto() {return photo;}

    public void setPhotoUrl( String photoUrl ) { this.photoUrl = photoUrl; }
    public String getPhotoUrl() {return photoUrl;}

}
