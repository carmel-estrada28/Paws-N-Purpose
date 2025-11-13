package com.kinora.paws_n_purpose_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "individual_users")
@PrimaryKeyJoinColumn(name = "email")
public class Individual extends User {
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    private String nickname;
    
    public Individual() {}
    
    public Individual(String email, String password, String firstName, String lastName) {
        super(email, password, UserRole.INDIVIDUAL);
        this.firstName = firstName;
        this.lastName = lastName;
    }
}