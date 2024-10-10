import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Subject } from 'rxjs';

export interface NewUser {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServizioProvaService {
  userCreated = new Subject<any>();
  userDeleted = new Subject<any>();
  persone: any
  result: boolean = false;

  constructor(private firebase: FirebaseService) { }

  getPersonaName(id: number){
    return this.persone[id].nome
  }

  getPersonaIndex(id: number){
    if (id >= this.persone.length) {
      return null;
    }
    return this.persone[id].id
  }

  getPersona(id: number){
    console.log(this.persone)
    if (id >= this.persone.length) {
      return null;
    }
    return this.persone[id]
  }

  getPersoneData(){
    return this.persone
  }

  /*getPersoneFirebase(){
    this.firebase.getPersone()
    .subscribe((data: any) => {
      console.log(data)
      this.persone = Object.keys(data).map((key) => {
        data[key]['id'] = key
        return data[key]})
      console.log(this.persone)
     })
  }*/

  deleteUser(id: string): void {
    const idx = this.persone.findIndex((ele: { id: string; }) => ele.id === id);

    this.persone.splice(idx, 1);

    console.log(`ID da elimire: ${idx}`)
    this.firebase.deletePersona(id)
    .subscribe(data => {
      console.log(data);
     })
  }

  createUser(newUser: NewUser): boolean {
    const idx = this.persone.findIndex((ele: { email: any; }) => ele.email === newUser.email);
    console.log(`IDx createUser: ${idx}`);
    if (idx !== -1) {
      return false;
    }

    //this.persone.push(user);

    this.firebase.insertPersona({nome: newUser.name, email: newUser.email })
    .subscribe(data => {
      console.log(data);
     })
    return true;
  }

  onCreateUser(): boolean{
    return this.result
  }

  resetResult(): void{
    this.result = false
  }

}
