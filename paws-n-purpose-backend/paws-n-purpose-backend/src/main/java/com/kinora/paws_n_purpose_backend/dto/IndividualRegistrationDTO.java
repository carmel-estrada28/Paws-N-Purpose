package com.kinora.paws_n_purpose_backend.dto;


public class IndividualRegistrationDTO {

    private String firstName;
    private String lastName;
    private String nickname;


    // setters & getters
    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNickname() {return nickname;}
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

}
