import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { CommentsService } from '../comments.service'

import { Comment } from '../comment';

@Component({
  moduleId: module.id,
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;

  constructor(
    private commentsService:CommentsService,
    private route:ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit() {
    console.log('hi');
  }

}
