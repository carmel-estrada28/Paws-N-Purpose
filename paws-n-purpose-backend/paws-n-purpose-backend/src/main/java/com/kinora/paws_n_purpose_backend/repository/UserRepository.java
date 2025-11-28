package com.kinora.paws_n_purpose_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kinora.paws_n_purpose_backend.entity.User;



@Repository
public interface  UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
}
