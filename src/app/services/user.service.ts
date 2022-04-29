import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  errorMessage: String = '';

  headerPost = new HttpHeaders({
    // 'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Content-Type': 'application/json',
  });

  login(body: any) {
    return this.http.post('http://localhost:3000/user/login', JSON.stringify(body),{headers: this.headerPost, })
    .subscribe(res => this.setSession)

  }

  register(body: any) {
    this.http.post('http://localhost:3000/user/register', body, {headers: this.headerPost})
      .subscribe(data => {
        const dataBack:any = data;
        if(dataBack.message) {
          this.errorMessage = dataBack.message;
        }
      })
  }

  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isLogedOut(): boolean {
    return !this.isLogedIn();
  }

}
