package com.task.cmvInternTask.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class JwtAuthResponse {
    private Set<String> roles;
    private String jwtToken;

}
