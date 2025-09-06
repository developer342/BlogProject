package com.example.app.auth.token.entity;

import com.example.app.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  // 토큰의 원문은 쿠키로만 내려가고 DB에는 절대 저장하지 않기 위해 "해시"만 저장
  @Column(name = "token_hash", nullable = false, length = 64) // SHA-256 hex = 64자
  private String tokenHash;

  @Column(name = "expires_at", nullable = false)
  private LocalDateTime expiresAt;

  @Column(nullable = false)
  private boolean revoked = false;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  // 회전 시 이전 토큰을 가리키고 싶다면(선택)
  @Column(name = "rotated_from_id")
  private Long rotatedFromId;

  public RefreshToken(User user, String tokenHash, LocalDateTime expiresAt) {
    this.user = user;
    this.tokenHash = tokenHash;
    this.expiresAt = expiresAt;
  }

  @PrePersist
  void onCreate() {
    this.createdAt = LocalDateTime.now();
  }

  public void revoke() { this.revoked = true; }

  public boolean isExpired() {
    return LocalDateTime.now().isAfter(expiresAt);
  }
}
