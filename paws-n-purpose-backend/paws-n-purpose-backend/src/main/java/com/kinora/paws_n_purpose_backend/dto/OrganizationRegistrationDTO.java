package com.kinora.paws_n_purpose_backend.dto;

public class OrganizationRegistrationDTO {
    private String email;
    private String password;
    private String orgName;

    // getters and setters

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getOrgName() { return orgName; }
    public void setOrgName(String orgName) { this.orgName = orgName; }
}
