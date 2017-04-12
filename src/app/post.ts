import {Comment} from './comment';

export interface Post {
    _id: string;
    title: string;
    body: string;
    comments: Comment[];
}