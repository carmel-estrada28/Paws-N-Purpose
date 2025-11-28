package com.kinora.paws_n_purpose_backend.exception;

public class InvalidEmailPasswordException extends RuntimeException {
    public InvalidEmailPasswordException(String message) {
        super(message);
    }
}
