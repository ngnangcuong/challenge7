import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private userService: UserService) { }

  postList: any;
  headerClient = new HttpHeaders({
    'Authentication': 'Bear ' + this.userService.token,
  })

  getAllPost() {
    this.http.get("http://localhost:3000/post", { headers: this.headerClient}).subscribe(data => {
      this.postList = data;
    }, err => {
      console.log(err);
    })
  }
}
