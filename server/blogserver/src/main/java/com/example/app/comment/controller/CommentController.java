package com.example.app.comment.controller;

import com.example.app.comment.dto.CommentRequest;
import com.example.app.comment.dto.CommentResponse;
import com.example.app.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles")
public class CommentController {

  private final CommentService commentService;

  @PostMapping("/{articleId}/comments")
  public CommentResponse create(@PathVariable Long articleId, @RequestBody CommentRequest request) {
    return commentService.create(articleId, request);
  }


  @GetMapping("/{articleId}/comments")
  public List<CommentResponse> getAll(@PathVariable Long articleId) {
    return commentService.getAll(articleId);
  }

  @PutMapping("/{articleId}/comments/{commentId}")
  public CommentResponse update(@PathVariable Long articleId, @PathVariable Long commentId, @RequestBody CommentRequest request) {
    return commentService.update(commentId, request);
  }

  @DeleteMapping("/{articleId}/comments/{commentId}")
  public void delete(@PathVariable Long articleId, @PathVariable Long commentId) {
    commentService.delete(commentId);
  }
}
