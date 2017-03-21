import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
	posts: Post[];
	
	constructor(private postsService: PostsService) { }

	ngOnInit() {
		this.getPosts();
	}

	getPosts(): void {
		this.postsService
			.getAllPosts()
			.subscribe(posts => this.posts = posts);
	}

	add(title: string, body: string): void {
		if( !title || !body) { return; }
		this.postsService.createPost(title,body)
			.then(post => this.posts.push(post))
	}

	deletePost(deletedId:string) {
		this.posts = this.posts.filter(p => p._id !== deletedId);
	}
}
