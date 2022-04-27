import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  token: String = '';
  errorMessage: String = '';

  headerPost = new HttpHeaders({
    // 'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Content-Type': 'application/json',
  });

  login(body: any) {
    this.http.post('http://localhost:3000/user/login', JSON.stringify(body), {headers: this.headerPost, }).subscribe(data => {
      const dataBack: any = data;
      if(dataBack.token) {
        this.token = dataBack.token;
      } else {
        this.errorMessage = dataBack.error;
      }

    });
  }

  register(body: any) {
    this.http.post('http://localhost:3000/user/register', body, {headers: this.headerPost}).subscribe(data => {
      const dataBack:any = data;
      if(dataBack.message) {
        this.errorMessage = dataBack.message;
      }
    })
  }

}
