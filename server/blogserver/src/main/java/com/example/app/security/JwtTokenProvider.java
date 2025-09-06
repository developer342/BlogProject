package com.example.app.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtTokenProvider {

  @Value("${jwt.secret}")
  private String secret;

  @Value("${jwt.access-token-expiration}") // 초 단위
  private long accessTtl;

  private Key key;

  @PostConstruct
  void init() {
    // HS256용 Key 생성 (secret 길이가 충분히 길어야 함)
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
  }

  public String generateAccessToken(Long userId, String email) {
    Instant now = Instant.now();
    Instant exp = now.plusSeconds(accessTtl);

    return Jwts.builder()
            .setSubject(String.valueOf(userId)) // sub = userId
            .claim("email", email)
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(exp))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
  }

  public long getAccessTtlSeconds() {
    return accessTtl;
  }

  public boolean validate(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  public Long getUserId(String token) {
    var claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    return Long.valueOf(claims.getSubject()); // sub에 userId 저장했었음
  }

  public String getEmail(String token) {
    var claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    return (String) claims.get("email");
  }
}
