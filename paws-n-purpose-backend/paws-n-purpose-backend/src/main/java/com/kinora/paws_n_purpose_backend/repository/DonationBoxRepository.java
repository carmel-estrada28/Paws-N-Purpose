package com.kinora.paws_n_purpose_backend.repository;


import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.kinora.paws_n_purpose_backend.entity.DonationBox;

@Repository
public interface DonationBoxRepository extends JpaRepository<DonationBox, Long>{
    List<DonationBox> findByOwnerId(Long ownerId);
    List<DonationBox> findByOwnerId(Long ownerId, Pageable pageable);
}
