package com.example.app.comment.dto;

import com.example.app.blog.entity.Article;
import com.example.app.comment.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentRequest {

  private String content;

  private Article article;

  public Comment toEntity(Article article,String content){
    return new Comment(article, content);
  }

}
