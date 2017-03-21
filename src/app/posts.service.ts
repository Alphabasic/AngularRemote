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

  getPost(_id: string): Promise<Post> {
    const url = `${this.postUrl}/${_id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Post)
      .catch(this.handleError);
  }
  
  update(post: Post): Promise<Post> {
    const url = `${this.postUrl}/${post._id}`
    return this.http.put(url, JSON.stringify(post), {headers: this.headers})
            .toPromise()
            .then(() => post)
            .catch(this.handleError);
  }

  createPost(title:string, body:string): Promise<Post> {
    const postJson = {'title': title, 'body': body};
    return this.http.put(this.postUrl, JSON.stringify(postJson), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Post)
            .catch(this.handleError);
  }

  deletePost(_id: string): Promise<void>{
    const url = `${this.postUrl}/${_id}`;
    return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}