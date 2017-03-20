import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
	posts: any = [];
	constructor(private postsService: PostsService) { }

	ngOnInit() {
		this.getPosts();
	}

	getPosts(): void {
		this.postsService
			.getAllPosts()
			.subscribe(posts => {this.posts = posts;})
	}
}
