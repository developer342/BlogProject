package com.example.app.blog.dto;

import com.example.app.blog.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@Builder
public class ArticleResponse {

  private Long id;
  private String title;
  private String content;

  public static ArticleResponse toRead(Article article){
    return ArticleResponse.builder()
            .id(article.getId())
            .title(article.getTitle())
            .content(article.getContent())
            .build();
  }


}
