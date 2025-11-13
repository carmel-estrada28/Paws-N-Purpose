package com.kinora.paws_n_purpose_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "organization_users")
@PrimaryKeyJoinColumn(name = "email")
public class Organization extends User {
    @Column(nullable = false)
    private String orgName;
    
    public Organization() {}
    
    public Organization(String email, String password, String orgName) {
        super(email, password, UserRole.ORGANIZATION);
        this.orgName = orgName;
    }
}