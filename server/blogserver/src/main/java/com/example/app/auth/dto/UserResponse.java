package com.example.app.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class UserResponse {

  private Long id;
  private String email;
  private LocalDateTime createdAt;
}
