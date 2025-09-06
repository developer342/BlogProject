package com.example.app.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenResponse {

  private String accessToken;
  private long expiresIn;
}
