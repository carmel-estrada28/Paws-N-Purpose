package com.kinora.paws_n_purpose_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kinora.paws_n_purpose_backend.dto.OrganizationRegistrationDTO;
import com.kinora.paws_n_purpose_backend.entity.Organization;
import com.kinora.paws_n_purpose_backend.entity.User;
import com.kinora.paws_n_purpose_backend.exception.OrgNameAlreadyTakenException;
import com.kinora.paws_n_purpose_backend.repository.OrganizationRepository;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;
    
    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Organization createOrganization(User user, OrganizationRegistrationDTO dto) {
        if (organizationRepository.existsByOrgName(dto.getOrgName())) {
            throw new OrgNameAlreadyTakenException("Organization name is already taken.");
        }

        Organization org = new Organization();

        org.setUser(user);
        org.setOrgName(dto.getOrgName());

        user.setOrganizationProfile(org);

        return organizationRepository.save(org);
    }

    public List<Organization> getAllOrgs() {
        return organizationRepository.findAll();
    }

    public Organization getOrg(Long id) {
        return organizationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Organization Profile not found."));
    }
    
}
