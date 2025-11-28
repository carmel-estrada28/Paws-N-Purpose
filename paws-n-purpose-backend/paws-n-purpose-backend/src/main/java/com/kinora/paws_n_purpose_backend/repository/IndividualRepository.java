package com.kinora.paws_n_purpose_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kinora.paws_n_purpose_backend.entity.Individual;

@Repository
public interface IndividualRepository extends JpaRepository<Individual, Long> {
    boolean existsByNickname(String nickname);
}
