package com.example.app.auth;

import com.example.app.auth.dto.LoginRequest;
import com.example.app.auth.dto.RegisterRequest;
import com.example.app.auth.dto.TokenResponse;
import com.example.app.auth.dto.UserResponse;
import com.example.app.security.JwtTokenProvider;
import com.example.app.user.entity.User;
import com.example.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  @Transactional
  public UserResponse register(RegisterRequest req){
    if(userRepository.existsByEmail(req.getEmail())){
      throw new ResponseStatusException(CONFLICT, "이미 사용중인 이메일입니다");
    }
    String hashed = passwordEncoder.encode(req.getPassword());
    User saved = userRepository.save(new User(req.getEmail(), hashed));
    return new UserResponse(saved.getId(), saved.getEmail(), saved.getCreatedAt());
  }

  @Transactional(readOnly = true)
  public TokenResponse login(LoginRequest req) {
    User user = userRepository.findByEmail(req.getEmail())
            .orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다."));

    if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
      throw new ResponseStatusException(UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    String access = jwtTokenProvider.generateAccessToken(user.getId(), user.getEmail());
    long expiresIn = jwtTokenProvider.getAccessTtlSeconds();
    return new TokenResponse(access, expiresIn);
  }
}
