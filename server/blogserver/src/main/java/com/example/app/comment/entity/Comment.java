package com.example.app.comment.entity;

import com.example.app.blog.entity.Article;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Comment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "article_id")
  private Article article;

  @Column
  private String content;

  public Comment(Article article, String content){
    this.article = article;
    this.content = content;
  }


  public void update(String content){
    this.content = content;
  }

}
