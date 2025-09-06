package com.example.app.user.controller;

import com.example.app.auth.dto.UserResponse;
import com.example.app.user.entity.User;
import com.example.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class MeController {

  private final UserRepository userRepository;

  @GetMapping("/me")
  public ResponseEntity<UserResponse> me(Authentication authentication) {
    // JwtAuthenticationFilter에서 principal을 userId로 넣었음
    Long userId = (Long) authentication.getPrincipal();
    User u = userRepository.findById(userId).orElseThrow();

    return ResponseEntity.ok(new UserResponse(u.getId(), u.getEmail(), u.getCreatedAt()));
  }
}
