package com.kinora.paws_n_purpose_backend.dto;

import jakarta.validation.constraints.NotBlank;

public class OrganizationRegistrationDTO {

    @NotBlank(message="Organization name is required.")
    private String orgName;

    // getters and setters

    public String getOrgName() { return orgName; }
    public void setOrgName(String orgName) { this.orgName = orgName; }
}
