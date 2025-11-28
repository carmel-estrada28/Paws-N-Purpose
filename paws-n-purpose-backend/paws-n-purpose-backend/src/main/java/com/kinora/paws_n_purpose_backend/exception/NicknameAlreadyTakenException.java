package com.kinora.paws_n_purpose_backend.exception;

public class NicknameAlreadyTakenException extends RuntimeException {
    public NicknameAlreadyTakenException(String message) {
        super(message);
    }
}
