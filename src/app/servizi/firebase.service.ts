import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth/auth.service'; 
import { BehaviorSubject, of, Subject, tap } from 'rxjs';

export interface User {
  nome: string;
  email: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //url = 'https://myappdb-8f7f7-default-rtdb.europe-west1.firebasedatabase.app/persone'
  url = 'http://localhost:5073/api/users'
  userCreated = new Subject<any>();
  userDeleted = new Subject<any>();
  userUpdated = new Subject<any>();
  cardOpened = new Subject<any>();

  public usersSubject = new BehaviorSubject<boolean>(false);

  persone: any = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.usersSubject.next(true);
  }

  insertPersona(body: {}){
    console.log(`${this.url}.json?auth=${this.authService.user!.token}`, body)
    return this.http.post(this.url, body)
    .pipe(
      tap(res => {
        this.persone = [];
        this.usersSubject.next(true);
      })
    );
  }
  
  getPersone(){
    console.log(`${this.url}.json?auth=${this.authService.user!.token}`)
    if(this.persone.length){
      return of(this.persone)
    }
    return this.http.get(this.url)
    .pipe(
      tap(res => this.persone = res)
    );
  }

  deletePersona(id: string){
    console.log('deletePersona url')
    console.log(`${this.url}/${id}.json?auth=${this.authService.user!.token}`)
    return this.http.delete(`${this.url}/${id}`)
    .pipe(
      tap(res => {
        this.persone = [];
        this.usersSubject.next(true);
      })
    );
  }

  getPersona(id: string){
    console.log(`${this.url}/${id}.json?auth=${this.authService.user!.token}`)
    return this.http.get(`${this.url}/${id}`)
  }

  patchPersona(id: string, body: {}){
    console.log(`${this.url}/${id}.json?auth=${this.authService.user!.token}`)
    return this.http.patch(`${this.url}/${id}`, body)
    .pipe(
      tap(res => {
        this.persone = [];
        this.usersSubject.next(true);
      })
    );
  }
}
