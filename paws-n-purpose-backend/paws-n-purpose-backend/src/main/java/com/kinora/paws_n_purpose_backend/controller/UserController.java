package com.kinora.paws_n_purpose_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kinora.paws_n_purpose_backend.dto.BasicRegistrationDTO;
import com.kinora.paws_n_purpose_backend.dto.IndividualRegistrationDTO;
import com.kinora.paws_n_purpose_backend.dto.OrganizationRegistrationDTO;
import com.kinora.paws_n_purpose_backend.entity.Individual;
import com.kinora.paws_n_purpose_backend.entity.Organization;
import com.kinora.paws_n_purpose_backend.entity.User;
import com.kinora.paws_n_purpose_backend.service.UserService;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register-basic")
    public ResponseEntity<?> registerBasic(@RequestBody BasicRegistrationDTO dto) {

        if (userService.emailExists(dto.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        return ResponseEntity.ok("Basic info accepted.");
    }

    @PostMapping("/individual")
    public ResponseEntity<?> createIndividual(@RequestBody IndividualRegistrationDTO dto) {
        if (userService.emailExists(dto.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        Individual individual = userService.createIndividualUser(dto);
        return ResponseEntity.ok(individual);
    }

    @PostMapping("/organization")
    public ResponseEntity<?> createOrganization(@RequestBody OrganizationRegistrationDTO dto) {
        if (userService.emailExists(dto.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        Organization org = userService.createOrganizationUser(dto);
        return ResponseEntity.ok(org);
    }
}
