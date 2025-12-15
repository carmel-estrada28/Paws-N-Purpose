package com.kinora.paws_n_purpose_backend.entity.enums;

public enum ProjectStatus {
    ACTIVE, // active if bag-o pang himo, can be seen by everyone
    CLOSED, // closed if iclose ni owner, can only be viewed by those who donated, however, di na ka donate
    ARCHIVED // cannot be viewed by anyone except the owner
}
