import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { Post } from '../models/post';
import { ConnectableObservable, Observable, of, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private userService: UserService) { }
  lastCreatePost: Observable<Post> = of();

  InitPost(userEmail: string): Observable<Post[]> {
    if (userEmail) return this.http.get<Post[]>(`http://localhost:3000/post/user/${userEmail}`) ;
    return this.http.get<Post[]>("http://localhost:3000/post");
  }

  LoadMorePost(page: Number): Observable<Post[]> {
    const params = new HttpParams()
      .set('page', page.toString());

    return this.http.get<Post[]>(`http://localhost:3000/post`, {
      params: params,
    });
  }

  SearchPost(keyword: string): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:3000/post/search/${keyword}`);
  }

  EditPost(id: Number, content: string) {
    const body = JSON.stringify({
      "content": content,
    })
    return this.http.put(`http://localhost:3000/post/update/${id}`, body);
  }

  DeletePost(id: Number) {
    return this.http.delete(`http://localhost:3000/post/delete/${id}`);
  }

  CreatePost(content: string): Observable<Post> {
    const body = JSON.stringify({
      "content": content,
    })
    return this.http.post<Post>('http://localhost:3000/post/create', body);
  }

  GetPost(id: Number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/post/${id}`);
  }
}
