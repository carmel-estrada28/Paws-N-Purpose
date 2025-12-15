package com.kinora.paws_n_purpose_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kinora.paws_n_purpose_backend.dto.ApiResponse;import com.kinora.paws_n_purpose_backend.dto.DonationBoxCreationDTO;
import com.kinora.paws_n_purpose_backend.entity.DonationBox;
import com.kinora.paws_n_purpose_backend.service.DonationBoxService;




@RestController
@RequestMapping("api/donation-boxes")
@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true"
)
public class DonationBoxController {

    @Autowired
    private final DonationBoxService donationBoxService;

    public DonationBoxController(DonationBoxService donationBoxService){
        this.donationBoxService = donationBoxService;
    }

        // GET APIS
    @GetMapping("/")
    public ResponseEntity<List<DonationBox>> getDonationBoxes(
            @RequestParam(required = false) Integer limit) {

        List<DonationBox> boxes = donationBoxService.getDonationBoxes(limit);

        return ResponseEntity.ok(boxes);
    }

    @GetMapping("/my")
    public ResponseEntity<List<DonationBox>> getMyDonationBoxes(   
            @CookieValue(name = "jwt") String jwtToken,
            @RequestParam(required = false) Integer limit) {

        List<DonationBox> boxes = donationBoxService.getMyDonationBoxes(jwtToken, limit);

        return ResponseEntity.ok(boxes);
    }


        // POST APIS
    @PostMapping(
        value = "/create-donation-box",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<Map<String, Object>, Object>> createDonationBox(@ModelAttribute DonationBoxCreationDTO dto) {
        DonationBox box = donationBoxService.createDonationBox(dto);

        Map<String, Object> response = new HashMap<>();

        response.put("donation_box", box);

        return ResponseEntity.ok()
            .body(new ApiResponse<>(true, response, null));
    }


       
}
