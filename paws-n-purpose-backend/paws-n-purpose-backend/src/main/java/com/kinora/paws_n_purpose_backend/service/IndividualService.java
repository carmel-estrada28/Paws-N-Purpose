package com.kinora.paws_n_purpose_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kinora.paws_n_purpose_backend.dto.IndividualRegistrationDTO;
import com.kinora.paws_n_purpose_backend.entity.Individual;
import com.kinora.paws_n_purpose_backend.entity.User;
import com.kinora.paws_n_purpose_backend.entity.UserRole;
import com.kinora.paws_n_purpose_backend.exception.NicknameAlreadyTakenException;
import com.kinora.paws_n_purpose_backend.repository.IndividualRepository;

@Service
public class IndividualService {
    private final IndividualRepository individualRepository;

    public IndividualService(IndividualRepository individualRepository) {
        this.individualRepository = individualRepository;
    }

    public Individual createIndividual(User user, IndividualRegistrationDTO dto) {

        
        if (individualRepository.existsByNickname(dto.getNickname())) {
            throw new NicknameAlreadyTakenException("Nickname is already taken.");
        }

        Individual individual = new Individual();
        individual.setUser(user);
        individual.setFirstName(dto.getFirstName());
        individual.setLastName(dto.getLastName());
        individual.setNickname(dto.getNickname());
        
        user.setIndividualProfile(individual);
        user.setRole(UserRole.INDIVIDUAL);

        return individualRepository.save(individual);
    }

    public List<Individual> getAllIndividuals() {
        return individualRepository.findAll();
    }

    public Individual getIndividual(Long id) {
        if (id==null) throw new RuntimeException("Id is not found");

        return individualRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Individual Profile not found"));
    }
}
