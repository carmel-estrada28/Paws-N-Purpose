package com.kinora.paws_n_purpose_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kinora.paws_n_purpose_backend.entity.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    boolean existsByOrgName(String orgName);
}
