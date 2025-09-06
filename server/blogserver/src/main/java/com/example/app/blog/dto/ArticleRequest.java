package com.example.app.blog.dto;

import com.example.app.blog.entity.Article;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleRequest {
  private String title;
  private String content;

  public Article toEntity(String title, String content){
    return new Article(title, content);
  }
}
