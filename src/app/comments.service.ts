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
    return this.http.get(this.makeUrl(_postId))
      .map(res => res.json());
  }

  getComment(postId: string, comment: Comment): Promise<Comment> {
    return this.http.get(this.makeUrl(postId, comment))
      .toPromise()
      .then(response => response.json() as Comment)
      .catch(this.handleError);
  }

  updateComment(postId: string, comment: Comment): Promise<Comment> {
    return this.http.put(this.makeUrl(postId, comment), JSON.stringify(comment), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Comment)
            .catch(this.handleError) 
  }

  createComment(_postId:string, body:string, author:string): Promise<Comment> {
    const commentJson = {'body': body, 'author': author};
    return this.http.put(this.makeUrl(_postId), JSON.stringify(commentJson), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Comment)
            .catch(this.handleError);
  }

  deleteComment(postId: string, comment: Comment): Promise<void>{
    return this.http.delete(this.makeUrl(postId, comment), {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private makeUrl(postId:string, comment?: Comment): string {
    return `${this.postUrl}/${postId}/comments/${comment ? comment._id : ''}`
  }
}
