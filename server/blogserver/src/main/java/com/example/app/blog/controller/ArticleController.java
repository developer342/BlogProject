package com.example.app.blog.controller;


import com.example.app.blog.dto.ArticleRequest;
import com.example.app.blog.dto.ArticleResponse;
import com.example.app.blog.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles")
public class ArticleController {

  final private ArticleService articleService;

  @PostMapping
  public ArticleResponse create(@RequestBody ArticleRequest request){
    return articleService.create(request);
  }

  @GetMapping("/{id}")
  public ArticleResponse get(@PathVariable Long id){
    return articleService.get(id);
  }

  @GetMapping
  public List<ArticleResponse> getAll(){
    return articleService.getAll();
  }

  @PutMapping("/{id}")
  public ArticleResponse update(@PathVariable Long id, @RequestBody ArticleRequest request){
    return articleService.update(id, request);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id){
    articleService.delete(id);
  }
}
