package com.kinora.paws_n_purpose_backend.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kinora.paws_n_purpose_backend.dto.DonationBoxCreationDTO;
import com.kinora.paws_n_purpose_backend.entity.DonationBox;
import com.kinora.paws_n_purpose_backend.repository.DonationBoxRepository;

import jakarta.transaction.Transactional;

@Service
public class DonationBoxService {
    private final DonationBoxRepository donationBoxRepository;
    private final ImageUploadService imageUploadService;
    private final JwtService jwtService;


    public DonationBoxService(DonationBoxRepository donationBoxRepository, ImageUploadService imageUploadService, JwtService jwtService) {
        this.donationBoxRepository = donationBoxRepository;
        this.imageUploadService = imageUploadService;
        this.jwtService = jwtService;
    }

    @Transactional
    public DonationBox createDonationBox(DonationBoxCreationDTO dto) {

        DonationBox box = new DonationBox();

        box.setTitle(dto.getTitle());
        box.setDescription(dto.getDescription());
        box.setGoalAmount(dto.getGoalAmount());

        if (dto.getPhoto() != null && !dto.getPhoto().isEmpty()) {
            String uploadedUrl = imageUploadService.upload(dto.getPhoto()); // Cloudinary URL
            box.setDonationBoxPhoto(uploadedUrl);
        } else {
            box.setDonationBoxPhoto(dto.getPhotoUrl());
        }

        return donationBoxRepository.save(box);
    }

    public List<DonationBox> getMyDonationBoxes(String jwtToken, Integer limit) {
        Long userId = jwtService.extractUserId(jwtToken);

        if (limit != null && limit > 0) {
            Pageable pageable = PageRequest.of(0, limit);
            return donationBoxRepository.findByOwnerId(userId, pageable);
        } else {
            return donationBoxRepository.findByOwnerId(userId);
        }
    }

    public List<DonationBox> getDonationBoxes(Integer limit) {
        if (limit != null && limit > 0) {
            Pageable pageable = PageRequest.of(0, limit); 
            return donationBoxRepository.findAll(pageable).getContent();
        } else {
            return donationBoxRepository.findAll();
        }
    }

}
