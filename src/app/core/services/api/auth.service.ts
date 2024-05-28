import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '@env/environment';
import { Router } from '@angular/router';
const AUTH_API = environment.apiUrl + '/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        AUTH_API + 'login',
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(tap((res: any) => this.saveUser(username, res)));
  }

  saveUser(email: string, data: any) {
    this.loggedUser = email;
    this.storeJwtToken(JSON.stringify(data));
    this.isAuthenticated.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticated.next(false);

    return this.http
      .post(AUTH_API + 'revoketoken', {}, httpOptions)
      .pipe(tap((res: any) => this.router.navigate(['/login'])));
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  /* refreshToken() {
    return this.http.post(AUTH_API + 'refreshtoken', {}, httpOptions);
  } */

  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return true;
    const token = JSON.parse(tokens).access_token;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

  refreshToken() {
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    //if (!tokens) return;
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_token;
    return this.http
      .post<any>(AUTH_API + 'refreshtoken', {
        refreshToken,
      })
      .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
  }
}

function jwtDecode(token: any) {
  return { exp: 1 };
}
