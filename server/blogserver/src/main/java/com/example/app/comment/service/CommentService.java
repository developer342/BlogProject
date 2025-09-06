package com.example.app.comment.service;

import com.example.app.blog.entity.Article;
import com.example.app.blog.repository.ArticleRepository;
import com.example.app.comment.dto.CommentRequest;
import com.example.app.comment.dto.CommentResponse;
import com.example.app.comment.entity.Comment;
import com.example.app.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

  private final CommentRepository commentRepository;
  private final ArticleRepository articleRepository;

  public CommentResponse create(Long articleId, CommentRequest request){
    Article article = articleRepository.findById(articleId).orElseThrow(() -> new IllegalArgumentException("Article Not Found"));

    Comment comment = commentRepository.save(request.toEntity(article, request.getContent()));
    return CommentResponse.toRead(comment);
  }

  public List<CommentResponse> getAll(Long articleId){
    return commentRepository.findByArticleId(articleId).stream()
            .map(CommentResponse::toRead)
            .toList();
  }


  @Transactional
  public CommentResponse update(Long commentId, CommentRequest request) {
    Comment comment = commentRepository.findById(commentId).orElseThrow(()-> new IllegalArgumentException("not found"));
    comment.update(request.getContent());
    return CommentResponse.toRead(comment);
  }

  public void delete(Long commentId){
    commentRepository.deleteById(commentId);
  }
}
