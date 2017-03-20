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
		this.postsService
			.getAllPosts()
			.then(posts => {this.posts = posts;})
	}

	logPosts() {
		console.log(this.posts);
	}
}
