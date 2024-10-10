import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../auth/auth.service'; 
import { BehaviorSubject, of, Subject, tap } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

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
  private URL = enviroment.API_USER_URL;
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
    //console.log(`${this.URL}.json?auth=${this.authService.user!.token}`, body)
    return this.http.post(this.URL, body)
    .pipe(
      tap(res => {
        this.persone = [];
        this.usersSubject.next(true);
      })
    );
  }
  
  getPersone(){
    //console.log(`${this.URL}.json?auth=${this.authService.user!.token}`)
    if(this.persone.length){
      return of(this.persone)
    }
    return this.http.get(this.URL)
    .pipe(
      tap(res => this.persone = res)
    );
  }

  deletePersona(id: string){
    //console.log('deletePersona url')
    //console.log(`${this.URL}/${id}.json?auth=${this.authService.user!.token}`)
    return this.http.delete(`${this.URL}/${id}`)
    .pipe(
      tap(res => {
        this.persone = [];
        this.usersSubject.next(true);
      })
    );
  }

  getPersona(id: string){
    //console.log(`${this.URL}/${id}.json?auth=${this.authService.user!.token}`)
    return this.http.get(`${this.URL}/${id}`)
  }

  patchPersona(id: string, body: {}){
    //console.log(`${this.URL}/${id}.json?auth=${this.authService.user!.token}`)
    return this.http.patch(`${this.URL}/${id}`, body)
    .pipe(
      tap(res => {
        this.persone = [];
        this.usersSubject.next(true);
      })
    );
  }
}
