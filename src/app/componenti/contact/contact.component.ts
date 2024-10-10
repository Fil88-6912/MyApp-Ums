import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServizioProvaService } from '../../servizi/servizio-prova.service'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContattoComponent } from '../contatto/contatto.component';
import { FirebaseService, User } from '../../servizi/firebase.service';
import { RouterOutlet } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule, CommonModule, ContattoComponent],
  template: '<app-contatto [data]="persone"></app-contatto>',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  persone: any | null = null;
  persona: any | null = null;
  data: any
  title = "Home component"
  //users$: Observable<any> = of([]);
  loadUsers: Subscription;

  constructor(private firebase: FirebaseService, private servizioProva: ServizioProvaService) {
    this.loadUsers = this.firebase.usersSubject.subscribe(res => {
      if (res) {
        this.onGetPersone();
      }
    })
  }

  ngOnInit(): void {
    /*this.firebase.getPersone()
    .subscribe((data: any) => {
      console.log(data)
      this.persone = Object.keys(data).map((key) => {
        data[key]['id'] = key
        return data[key]})
      console.log(this.persone)
     })*/
    //this.servizioProva.getPersoneFirebase()
    //this.users$ = this.servizioProva.getPersoneData()
    //console.log(this.persone)
    /*if(this.route.snapshot.paramMap.get('id')){
      this.isProfile = true
      this.persona = this.servizioProva.getPersonaIndex(parseInt(this.route.snapshot.paramMap.get('id')!))
      console.log(this.persona)
      console.log(this.route.snapshot.paramMap.get('id'))
    }else{
      this.isProfile = false
      this.persone = this.servizioProva.getPersona()
    }*/
    //this.prova.getData(this.persone)
  }

  onDeletePersona(id: string){
    this.servizioProva.deleteUser(id)
    //this.persone = this.servizioProva.getPersoneData()
  }

  onGetPersone(){
    this.firebase.getPersone()
    .subscribe((data: any) => {
      console.log(data)
      /*this.persone = Object.keys(data).map((key) => {
        data[key]['id'] = key
        return data[key]})
      console.log(this.persone)*/
      this.persone = data
     })
  }

  onOpenCard(id: string){
    console.log('onOpenCard');
    this.firebase.cardOpened.next(id);
  }
}
