package com.kinora.paws_n_purpose_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kinora.paws_n_purpose_backend.dto.IndividualRegistrationDTO;
import com.kinora.paws_n_purpose_backend.dto.OrganizationRegistrationDTO;
import com.kinora.paws_n_purpose_backend.entity.Individual;
import com.kinora.paws_n_purpose_backend.entity.Organization;
import com.kinora.paws_n_purpose_backend.entity.User;
import com.kinora.paws_n_purpose_backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; 
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public Individual createIndividualUser(IndividualRegistrationDTO dto) {
        Individual user = new Individual();

        user.setEmail(dto.getEmail());               
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setNickname(dto.getNickname());
        
        return userRepository.save(user);
    }

    public Organization createOrganizationUser(OrganizationRegistrationDTO dto) {
        Organization user = new Organization();

        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setOrgName(dto.getOrgName());
        
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUser(String email) {
        return userRepository.findById(email).orElse(null);
    }
}
