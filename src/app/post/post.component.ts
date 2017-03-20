import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { PostsService } from '../posts.service';
import { Post } from '../post';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	@Input()	
	post: Post;
	
	constructor(
		private postsService: PostsService,
	    private route: ActivatedRoute,
	    private location: Location
	) {}

	ngOnInit() {
		this.getPost();
	}

	getPost(): void {
   	 this.route.params
      .switchMap((params: Params) => this.postsService.getPost(+params['_id']))
      .subscribe(post => this.post = post);
	}

	save(): void {
		console.log(this.post)
		this.postsService.update(this.post)
	}
}
