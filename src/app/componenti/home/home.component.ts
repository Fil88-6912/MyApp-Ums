import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { interval, Observable } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService, User } from '../../servizi/firebase.service';
import { NewUser, ServizioProvaService } from '../../servizi/servizio-prova.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  //sottiscrizione: any
  homeform: any
  idpersona: any
  persona: User | null = null;
  isDisabled = true;
  
  title = "User Management System"
  @Output() createUser = new EventEmitter<any>();

  constructor(private firebase: FirebaseService, private servizioProva: ServizioProvaService) {}

  ngOnInit(): void{ 
    /*this.sottiscrizione = interval(1000).subscribe(numero => {
      console.log(numero)
    })*/
    
    this.homeform = new FormGroup({
      nome: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      //colore: new FormControl()
    });
  }

  ngOnDestroy(): void {
    //this.sottiscrizione.unsubscribe()
  }

  /*onSubmit(form: NgForm) {
    console.log('HomeComponent onSubmit form:')
    console.log(form)
  }*/

  onSubmit(form: NgForm) {
    console.log(this.homeform.get('nome').value)

    const userName = this.homeform.get('nome').value
    const phoneNumber = this.homeform.get('phoneNumber').value
    const email = this.homeform.get('email').value
 
    const newUser = {userName, phoneNumber, email}

    this.firebase.userCreated.next(newUser)
    form.reset()
  }

  onDeletePersona(){
    this.firebase.deletePersona(this.idpersona)
    .subscribe(data => {
      console.log(data);
     })
  }

  onPatchPersona(){
    this.firebase.patchPersona(this.idpersona, {email: 'prova@yellow.it'})
    .subscribe(data => {
      console.log(data);
     })
  }
}
