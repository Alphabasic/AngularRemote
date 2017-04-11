import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { CommentsService } from '../comments.service'

import { Post } from '../post';
import { Comment } from '../comment';


@Component({
  moduleId: module.id,
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() post: Post;
  comments: Comment[];

  constructor(
    private commentsService:CommentsService,
    private route:ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getComments();
  }

  // getComments(): void {
  //  	 this.route.params
  //     .switchMap((params: Params) => this.commentsService.getAllPostComments(this.post._id))
  //     .subscribe(comments => this.comments = comments);
	// }

  	getComments(): void {
		this.commentsService
			.getAllPostComments(this.post._id)
			.subscribe(comments => this.comments = comments);
	}
}
