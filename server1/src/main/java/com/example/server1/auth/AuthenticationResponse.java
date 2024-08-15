package com.example.server1.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
@Builder
public class AuthenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;
}
