package com.example.app.comment.dto;

import com.example.app.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class CommentResponse {
  private Long id;

  private Long articleId;

  private String content;

  public static CommentResponse toRead(Comment comment){
    return CommentResponse.builder()
            .id(comment.getId())
            .articleId(comment.getArticle().getId())
            .content(comment.getContent())
            .build();
  }

}
