package com.kinora.paws_n_purpose_backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kinora.paws_n_purpose_backend.dto.ApiResponse;
import com.kinora.paws_n_purpose_backend.dto.UserAuthenticationDTO;
import com.kinora.paws_n_purpose_backend.dto.UserRegistrationDTO;
import com.kinora.paws_n_purpose_backend.entity.User;
import com.kinora.paws_n_purpose_backend.entity.enums.UserRole;
import com.kinora.paws_n_purpose_backend.service.JwtService;
import com.kinora.paws_n_purpose_backend.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;



@RestController
@RequestMapping("api/users")
@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true"
)
public class UserController {

    @Autowired
    private final JwtService jwtService;
    private final UserService userService;

    public UserController(UserService userService, JwtService jwtService){
        this.userService = userService;
        this.jwtService = jwtService;
    }

        // GET APIS
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@CookieValue(name = "jwt", required = false) String token) {
        
        Map<String, Object> response = new HashMap<>();

        if (token == null || !jwtService.isTokenValid(token)) {
            response.put("authenticated", false);
            return ResponseEntity.ok(response);
        }

        Long userId = jwtService.extractUserId(token);
        User user = userService.getUser(userId);

        if (user == null) {
            response.put("authenticated", false);
            return ResponseEntity.ok(response);
        }

        boolean hasProfileSet = user.getIndividualProfile() != null || user.getOrganizationProfile() != null;

        response.put("authenticated", true);
        Map<String, Object> userMap = new HashMap<>();

        userMap.put("id", user.getId());
        userMap.put("email", user.getEmail());
        userMap.put("role", user.getRole());
        userMap.put("hasProfileSet", hasProfileSet);

        response.put("user", userMap);

        return ResponseEntity.ok(response);
    }

        // POST APIS
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Map<String, Object>, Object>> registerBasic(@Valid @RequestBody UserRegistrationDTO dto) {
        User user = userService.createUser(dto);

        boolean hasProfileSet = user.getIndividualProfile() != null || user.getOrganizationProfile() != null;

        String token = jwtService.generateToken(user.getId(), user.getEmail(), null);

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
            .httpOnly(true)
            .secure(false)
            .path("/")
            .sameSite("Lax")
            .maxAge(86400)
            .build();

        Map<String, Object> response = new HashMap<>();
        
        response.put("authenticated", true);

        Map<String, Object> userMap = new HashMap<>();

        userMap.put("id", user.getId());
        userMap.put("email", user.getEmail());
        userMap.put("hasProfileSet", hasProfileSet);

        response.put("user", userMap);

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(new ApiResponse<>(true, response, null));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<ApiResponse<Map<String, Object>, Object>> login(@Valid @RequestBody UserAuthenticationDTO dto) {
        User user = userService.authenticateUser(dto);

        UserRole role = user.getRole();
        boolean hasProfileSet = user.getIndividualProfile() != null || user.getOrganizationProfile() != null;

        String token = jwtService.generateToken(user.getId(), user.getEmail(), role);

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
            .httpOnly(true)
            .secure(false)
            .path("/")
            .sameSite("Lax")
            .maxAge(86400)
            .build();

        Map<String, Object> response = new HashMap<>();

        response.put("authenticated", true);

        Map<String, Object> userMap = new HashMap<>();

        userMap.put("id", user.getId());
        userMap.put("email", user.getEmail());
        userMap.put("hasProfileSet", hasProfileSet);

        response.put("user", userMap);

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(new ApiResponse<>(true, response, null));
    }


    @GetMapping("/logout") // change it to POST later
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); 
        cookie.setPath("/");   

        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
