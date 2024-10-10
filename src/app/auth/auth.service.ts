import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../modelli/user.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, switchMap } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private singUpUrl = enviroment.API_REGISTER_URL;
  private singInUrl = enviroment.API_LOGIN_URL;
  isLogged = false;
  isAdmin = true;
  //private isLoggedInSubject: BehaviorSubject<boolean>;
  //public isLoggedIn$: Observable<boolean>;
  private currentUserSubject = new BehaviorSubject<user | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  user: user | null = null;
  
  constructor(private http: HttpClient, private router: Router) {
    //this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    //this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    const user = this.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  isAuthenticated(){
    return this.isLogged;
  }

  isRoleAdmin(){
    return this.isAdmin
  }

  createUser(email: string, id: string, token: string, expirationDate: Date){
    this.user = new user(email, id, token, expirationDate)
    this.isLogged = true
  }

  singUp(email: string, password: string) {
    console.log(this.singUpUrl);
    return this.http.post(this.singUpUrl, {email: email, password: password})  //returnSecureToken: true
  }

  singIn(email: string, password: string) {
    console.log(this.singInUrl);
    return this.getUserAuth(email, password);
  }

  private getUserAuth(email: string, password: string): Observable<user | null> {
    return this.http.post(this.singInUrl, {email: email, password: password})
      .pipe(switchMap((data: any) => {
        console.log(data)
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
        this.createUser(email, password, data.accessToken, expirationDate)
        console.log('Token: ' + data.accessToken)
        console.log('User: ' + this.user?.email)
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('jwt', data.accessToken);
        //this.isLoggedInSubject.next(true);
        this.currentUserSubject.next(this.user)
        return of(this.user);
      }));
  }

  logOut(){
    this.isLogged = false;
    this.user = null;
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    //this.isLoggedInSubject.next(false);
  }

  /*private hasToken(): boolean {
    const token = this.getToken();
    console.log('hasToken: ' + token)
    if(!token){
      return false;
    }
    return true;
  }*/

  public getToken(): string | null {
    if (!this.user) {
      return null;
    }
    return this.user._token;
  }

  public getUser(): user | null {
    return this.user;
  }
}
