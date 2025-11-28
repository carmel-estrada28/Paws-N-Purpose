package com.kinora.paws_n_purpose_backend.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.kinora.paws_n_purpose_backend.dto.ApiResponse;



@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidEmailPasswordException.class)
    public ResponseEntity<ApiResponse<Object, Map<String, List<Map<String, String>>>>> handleInvalidEmailPassword(InvalidEmailPasswordException ex) {

        Map<String, List<Map<String, String>>> errors = new HashMap<>();
        errors.put("invalid", List.of(Map.of("message", ex.getMessage())));

        ApiResponse<Object, Map<String, List<Map<String, String>>>> response = new ApiResponse<>(
            false, 
            null, 
            errors
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Object, Map<String, List<Map<String, String>>>>> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {

        Map<String, List<Map<String, String>>> errors = new HashMap<>();
        errors.put("email", List.of(Map.of("message", ex.getMessage())));

        ApiResponse<Object, Map<String, List<Map<String, String>>>> response = new ApiResponse<>(
            false, 
            null, 
            errors
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(NicknameAlreadyTakenException.class)
    public ResponseEntity<ApiResponse<Object, Map<String, List<Map<String, String>>>>> handleNicknameAlreadyTaken(NicknameAlreadyTakenException ex) {
        
        Map<String, List<Map<String, String>>> errors = new HashMap<>();
        errors.put("nickname", List.of(Map.of("message", ex.getMessage())));

        ApiResponse<Object, Map<String, List<Map<String, String>>>> response = new ApiResponse<>(
            false, 
            null, 
            errors
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(OrgNameAlreadyTakenException.class)
    public ResponseEntity<ApiResponse<Object, Map<String, List<Map<String, String>>>>> handleOrgNameAlreadyTaken(OrgNameAlreadyTakenException ex) {
        
        Map<String, List<Map<String, String>>> errors = new HashMap<>();
        errors.put("orgname", List.of(Map.of("message", ex.getMessage())));

        ApiResponse<Object, Map<String, List<Map<String, String>>>> response = new ApiResponse<>(
            false, 
            null, 
            errors
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object, Map<String, List<Map<String, String>>>>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {

        // Map field name → list of {type, message} objects
        Map<String, List<Map<String, String>>> fieldErrors = new LinkedHashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField();
            String message = error.getDefaultMessage();

            // Determine a simple type based on message content (optional, customize as needed)
            String type;
            if (message.toLowerCase().contains("required")) type = "required";
            else if (message.toLowerCase().contains("format") || message.toLowerCase().contains("invalid")) type = "format";
            else if (message.toLowerCase().contains("characters")) type = "length";
            else type = "validation";

            // Initialize list if field not already in map
            fieldErrors.putIfAbsent(field, new ArrayList<>());

            // Add error object
            Map<String, String> errorObj = new HashMap<>();
            errorObj.put("type", type);
            errorObj.put("message", message);

            fieldErrors.get(field).add(errorObj);
        });

        fieldErrors.forEach((field, errorsList) -> {
            errorsList.sort((a, b) -> {
                List<String> priority = List.of("required", "format", "length", "validation");
                return Integer.compare(priority.indexOf(a.get("type")), priority.indexOf(b.get("type")));
            });
        });

        ApiResponse<Object, Map<String, List<Map<String, String>>>> response = new ApiResponse<>(false, null, fieldErrors);
        return ResponseEntity.badRequest().body(response);
    }

}
