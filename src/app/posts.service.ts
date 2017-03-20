import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from './post';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllPosts(): Promise<Post[]> {
    return this.http.get('http://localhost:3000/api/posts')
      .toPromise()
      .then( res => res.json().data as Post[])
      .catch(this.handleError)
  }

  updatePost(id: string) {
    
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}