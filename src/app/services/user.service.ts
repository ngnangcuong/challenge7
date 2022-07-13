import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import * as moment from "moment";
import { User } from '../models/user'
import { ChangePass } from '../models/changePass';

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

  register(body: any): Observable<User> {
    return this.http.post<User>('http://localhost:3000/user/register', body, {headers: this.headerPost})
      
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

  public getMe(): Observable<User> {
    return this.http.get<User>('http://localhost:3000/user/me')
  }

  public getUser(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/user/${email}`);
  }

  public updateUser(newInfo: User) {
    const body = JSON.stringify(newInfo);
    return this.http.patch(`http://localhost:3000/user/update/${newInfo.id}`, body);
  }

  public changePassword(req: ChangePass) {
    const body = JSON.stringify(req);
    return this.http.put('http://localhost:3000/user/changePass', body);
  }

  public requestResetPassword(email: string): Observable<string> {
    const body = JSON.stringify({
      email: email,
    });
    return this.http.post<string>("http://localhost:3000/user/resetPassword", body);
  }

  public resetPassword(token: string, password: ChangePass) {
    const body = JSON.stringify(password);
    return this.http.put(`http://localhost:3000/user/resetPassword?token=${token}`, body);
  }

}
