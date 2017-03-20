import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Post } from './post';

@Injectable()
export class PostsService {

  private headers = new Headers({'Content-type': 'application/json'});
  private postUrl = 'http://localhost:3000/api/posts';

  constructor(private http: Http) {}

  // Get all posts from the API
  getAllPosts() {
    return this.http.get(this.postUrl)
      .map(res => res.json());
  }

  getPost(id: number): Promise<Post> {
    const url = `${this.postUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Post)
      .catch(this.handleError);
  }
  update(post: Post): Promise<Post> {
    const url = `${this.postUrl}/${post.id}`
    return this.http.put(url, JSON.stringify(post), {headers: this.headers})
            .toPromise()
            .then(() => post)
            .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}