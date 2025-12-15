package com.kinora.paws_n_purpose_backend.service;

import org.springframework.stereotype.Service;

import com.kinora.paws_n_purpose_backend.dto.DonationBoxCreationDTO;
import com.kinora.paws_n_purpose_backend.entity.DonationBox;
import com.kinora.paws_n_purpose_backend.repository.DonationBoxRepository;

import jakarta.transaction.Transactional;

@Service
public class DonationBoxService {
    private final DonationBoxRepository donationBoxRepository;
    private final ImageUploadService imageUploadService;


    public DonationBoxService(DonationBoxRepository donationBoxRepository, ImageUploadService imageUploadService) {
        this.donationBoxRepository = donationBoxRepository;
        this.imageUploadService = imageUploadService;
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

}
