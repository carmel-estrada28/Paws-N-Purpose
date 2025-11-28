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
import com.kinora.paws_n_purpose_backend.dto.IndividualRegistrationDTO;
import com.kinora.paws_n_purpose_backend.entity.Individual;
import com.kinora.paws_n_purpose_backend.entity.User;
import com.kinora.paws_n_purpose_backend.service.IndividualService;
import com.kinora.paws_n_purpose_backend.service.JwtService;
import com.kinora.paws_n_purpose_backend.service.UserService;


@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class IndividualController {
    private final IndividualService individualService;
    private final UserService userService;
    private final JwtService jwtService;

    public IndividualController(IndividualService individualService, UserService userService, JwtService jwtService) {
        this.individualService = individualService;
        this.userService = userService;
        this.jwtService = jwtService;
    }




        // GET APIS





        // POST APIS
    @PostMapping("/create-individual-profile")
    public ResponseEntity<ApiResponse<Map<String, Object>, Object>> registerIndividual(
        @CookieValue(name = "jwt", required = true) String token,
        @RequestBody IndividualRegistrationDTO dto) {
    
            
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

        Individual individual = individualService.createIndividual(user, dto);

        Map<String, Object> data = new HashMap<>();
        data.put("userId", user.getId());
        data.put("individualId", individual.getId());
        data.put("email", user.getEmail());

        return ResponseEntity.ok(
            new ApiResponse<>(true, data, null)
        );
    }
}
