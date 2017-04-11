import 'rxjs/add/operator/switchMap';
import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { PostsService } from '../posts.service';
import { Post } from '../post';

@Component({
	moduleId: module.id,
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	@Input() post: Post;
	@Output() onDelete = new EventEmitter();
	
	constructor(
		private postsService: PostsService,
	    private route: ActivatedRoute,
	    private location: Location
	) {}

	ngOnInit() {
		this.getPost();
		console.log(this.post)
	}

	getPost(): void {
   	 this.route.params
      .switchMap((params: Params) => this.postsService.getPost(this.post._id))
      .subscribe(post => this.post = post);
	}

	save(): void {
		this.postsService.update(this.post)
	}

	deletePost(post:Post):void{
		this.postsService.deletePost(post._id)
		this.onDelete.emit(post._id)
	}
}
