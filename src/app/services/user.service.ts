import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import * as moment from "moment";

interface User {
  'message': string
}
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
    return this.http.post<User>('http://localhost:3000/user/login', JSON.stringify(body),{headers: this.headerPost, })
    .pipe(
      tap(res => this.setSession(res))
      )

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

    const expiredAt = moment().add(authResult.expiredIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expiredAt", JSON.stringify(expiredAt.valueOf())); 
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiredAt');
  }

  public isLogedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLogedOut(): boolean {
    return !this.isLogedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiredAt');
    const expiredAt = JSON.parse(expiration!);

    return moment(expiredAt);
  }

}
