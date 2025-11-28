package com.kinora.paws_n_purpose_backend.dto;

public class ApiResponse<T, U> {
    private boolean success;
    private T data;
    private U errors;

    public ApiResponse(boolean success, T data, U errors) {
        this.success = success;
        this.data = data;
        this.errors = errors;
    }

    public boolean getSuccess() {return success;} 
    public void setSuccess(boolean success) {
        this.success = success;
    }

    public T getData() {return data;}
    public void setData(T data) {
        this.data = data;
    }

    public U getErrors() {return errors;}
    public void setErrors(U errors) {
        this.errors = errors; 
    }
}
