import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NewUser, ServizioProvaService } from '../../servizi/servizio-prova.service';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FirebaseService, User } from '../../servizi/firebase.service';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contatto',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatFormFieldModule, MatInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contatto.component.html',
  styleUrl: './contatto.component.css'
})
export class ContattoComponent implements OnInit{
  //@Input() data: any;
  //id: any
  userform: any
  persona: any
  userId: string = ""
  //user$: Observable<any | null> = of(null);
  cardOpenedSub: Subscription;
  isDisabled: boolean = true;
 
  constructor(private route: ActivatedRoute, private firebase: FirebaseService, private router: Router) {
    this.cardOpenedSub = this.firebase.cardOpened.subscribe(elem => {
      console.log(elem)
      this.getPersonaData(elem)
    });
  }

  ngOnInit(): void{
    /*var id = +this.route.snapshot.paramMap.get('id')!
    console.log(`ID mappato: ${id}`)
    this.route.paramMap.subscribe((params: ParamMap)=>{
      id = +params.get('id')!
      console.log(`ID mappato 2: ${id}`)
    })*/
    
    /*this.contatto = this.servizioProva.getPersona()
    if(this.route.snapshot.paramMap.get('id')){
      this.contatto = this.servizioProva.getPersonaIndex(this.id)
    }*/ 
      this.userform = new FormGroup({
        userId: new FormControl(),
        userName: new FormControl(null, Validators.required),
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required)
      });
  }

  onDeletePersona(id: string){
    this.firebase.userDeleted.next(id)
    //this.servizioProva.deleteUser(id)
    this.onCloseCard()
  }

  onCloseCard(){
    this.router.navigate(['/contact'])
    if(!this.isDisabled){
      this.isDisabled = true
    }
  }

  getPersonaData(id: string){
    this.firebase.getPersona(id)
    .subscribe((data: any) => {
      console.log(data)
      this.persona = data
      console.log(this.persona)
    })
    //this.userId = id
    if(!this.isDisabled){
      this.isDisabled = true
    }
  }

  onSubmit(id: string){
    console.log('onSubmit ' + id)
    console.log('onSubmit ' + this.userform.get('userName').value)
    const userName = this.userform.get('userName').value
    const firstName = this.userform.get('firstName').value
    const lastName = this.userform.get('lastName').value
    const phoneNumber = this.userform.get('phoneNumber').value
    const email = this.userform.get('email').value
 
    const updateUser = {id, userName, firstName, lastName, phoneNumber, email}

    this.firebase.userUpdated.next(updateUser)
    this.onCloseCard()
  }

  onActivateForm(){
    this.isDisabled = false;
  }
}
