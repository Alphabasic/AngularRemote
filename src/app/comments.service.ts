import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Comment } from './comment';

@Injectable()
export class CommentsService {

  private headers = new Headers({'Content-type': 'application/json'});
  private postUrl = 'http://localhost:3000/api/posts';

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllPostComments(_postId: string) {
    return this.http.get(`${this.postUrl}/${_postId}/comments`)
      .map(res => res.json());
  }

  getComment(comment: Comment): Promise<Comment> {
    return this.http.get(this.makeUrl(comment))
      .toPromise()
      .then(response => response.json() as Comment)
      .catch(this.handleError);
  }

  updateComment(comment: Comment): Promise<Comment> {
    const url = `${this.postUrl}/${comment._postId}/comments/${comment._id}`;
    return this.http.put(this.makeUrl(comment), JSON.stringify(comment), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Comment)
        .catch(this.handleError) 
  }

  createComment(_postId:string, title:string, body:string): Promise<Comment> {
    const postJson = {'title': title, 'body': body};
    return this.http.put(this.postUrl, JSON.stringify(postJson), {headers: this.headers})
          .toPromise()
          .then(res => res.json() as Comment)
          .catch(this.handleError);
  }

   deleteComment(comment: Comment): Promise<void>{
    return this.http.delete(this.makeUrl(comment), {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private makeUrl(comment: Comment): string {
    return `${this.postUrl}/${comment._postId}/comments/${comment._id}`
  }
}
