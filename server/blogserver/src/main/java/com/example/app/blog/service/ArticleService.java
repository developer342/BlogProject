package com.example.app.blog.service;

import com.example.app.blog.dto.ArticleRequest;
import com.example.app.blog.dto.ArticleResponse;
import com.example.app.blog.entity.Article;
import com.example.app.blog.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ArticleService {

  private final ArticleRepository articleRepository;

  public ArticleResponse create(ArticleRequest request){
    Article article = articleRepository.save(request.toEntity(request.getTitle(), request.getContent()));
    return ArticleResponse.toRead(article);
  }

  public ArticleResponse get(Long id){
    Article article = articleRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Not found"));
    return ArticleResponse.toRead(article);
  }

  public List<ArticleResponse> getAll(){
    return articleRepository.findAll().stream()
            .map(ArticleResponse::toRead)
            .toList();
  }

  @Transactional
  public ArticleResponse update(Long id, ArticleRequest request){
    Article article = articleRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Not found"));
    article.update(request.getTitle(), request.getContent());
    return ArticleResponse.toRead(article);
  }

  public void delete(Long id){
    articleRepository.deleteById(id);
  }


}
