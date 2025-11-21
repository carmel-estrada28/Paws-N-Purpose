package com.kinora.paws_n_purpose_backend.dto;

public class BasicRegistrationDTO {
    private String email;
    private String password;

    public BasicRegistrationDTO() {}

    public BasicRegistrationDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
