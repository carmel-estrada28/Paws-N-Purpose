package com.kinora.paws_n_purpose_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kinora.paws_n_purpose_backend.dto.ApiResponse;
import com.kinora.paws_n_purpose_backend.dto.OrganizationRegistrationDTO;
import com.kinora.paws_n_purpose_backend.entity.Organization;
import com.kinora.paws_n_purpose_backend.entity.User;
import com.kinora.paws_n_purpose_backend.service.JwtService;
import com.kinora.paws_n_purpose_backend.service.OrganizationService;
import com.kinora.paws_n_purpose_backend.service.UserService;


@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class OrganizationController {
    private final JwtService jwtService;
    private final OrganizationService organizationService;
    private final UserService userService; 

    public OrganizationController(JwtService jwtService, OrganizationService organizationService, UserService userService) {
        this.jwtService = jwtService;
        this.organizationService = organizationService;
        this.userService = userService;
    }




        // GET APIS




        // POST APIS

    @PostMapping("/create-org-profile")
    public ResponseEntity<ApiResponse<Map<String, Object>, Object>> registerProfile(
        @CookieValue(name = "jwt", required = true) String token,
        @RequestBody OrganizationRegistrationDTO dto) {
    
        Map<String, List<Map<String, String>>> errors = new HashMap<>();
        
        if (!jwtService.isTokenValid(token)) {
            errors.put("authentication", List.of(Map.of("message", "Not authenticated")));

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse<>(false, null, errors));
        }

        Long userIdFromToken = jwtService.extractUserId(token);
        User user = userService.getUser(userIdFromToken);

        if (user == null) {
            errors.put("authentication", List.of(Map.of("message", "User not found")));

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse<>(false, null, errors));
        }

        Organization organization = organizationService.createOrganization(user, dto);

        Map<String, Object> data = new HashMap<>();
        data.put("userId", user.getId());
        data.put("organizationId", organization.getId());
        data.put("email", user.getEmail());

        return ResponseEntity.ok(
            new ApiResponse<>(true, data, null)
        );
    }
}
