package com.kinora.paws_n_purpose_backend.exception;

public class OrgNameAlreadyTakenException extends RuntimeException {
    public OrgNameAlreadyTakenException(String message) {
        super(message);
    }
}
