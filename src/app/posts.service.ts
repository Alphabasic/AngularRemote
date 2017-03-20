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
}