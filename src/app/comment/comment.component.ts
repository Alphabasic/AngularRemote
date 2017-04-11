import 'rxjs/add/operator/switchMap';
import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { CommentsService } from '../comments.service'

import { Comment } from '../comment';
import { Post } from '../post';


@Component({
  moduleId: module.id,
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() post: Post;
  @Input() comment: Comment;

  constructor(
    private commentsService:CommentsService,
    private route:ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.commentsService.getComment(this.post._id, this.comment))
      .subscribe(comment => this.comment = comment);
  }

}
