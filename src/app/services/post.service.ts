import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

interface Post {
  Id: Number;
  Email: String;
  Content: String;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private userService: UserService) { }


  InitPost(): Observable<Post[]> {
    return this.http.get<Post[]>("http://localhost:3000/post");
  }

  LoadMorePost(page: Number): Observable<Post[]> {
    const params = new HttpParams()
      .set('page', page.toString());

    return this.http.get<Post[]>("http://localhost:3000/post?page=" + page, {
      params: params,
    });
  }

  SearchPost(keyword: string): Observable<Post[]> {
    return this.http.get<Post[]>("http://localhost:3000/post/search/" + keyword);
  }
}
