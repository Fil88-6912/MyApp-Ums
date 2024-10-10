import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './componenti/about/about.component';
import { ContactComponent } from './componenti/contact/contact.component';
import { HomeComponent } from './componenti/home/home.component'
import { NewUser, ServizioProvaService } from './servizi/servizio-prova.service';
import { interval, Observable, Subscription } from 'rxjs';
import { SingupComponent } from './componenti/singup/singup.component';
import { AuthService } from './auth/auth.service'; 
import {MatButtonModule} from '@angular/material/button';
import { ThemeTogglerComponent } from './componenti/theme-toggler/theme-toggler.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { FooterComponent } from './componenti/footer/footer.component';
import { FirebaseService, User } from './servizi/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AboutComponent, ContactComponent, HomeComponent, SingupComponent, RouterOutlet, RouterModule, MatButtonModule, ThemeTogglerComponent, NavbarComponent, FooterComponent],
  //template: '<a routerLink="/" style="margin-right: 10px;">Home</a> <a routerLink="/about" style="margin-right: 10px;">About</a> <a routerLink="/contact" style="margin-right: 10px;">Contact</a> <router-outlet></router-outlet>',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy{
  title = "myapp";
  userCreatedSub: Subscription;
  userDeletedSub: Subscription;
  userUpdatedSub: Subscription;

  constructor(private servizioProva: ServizioProvaService, private authService: AuthService, private firebase: FirebaseService) {
      this.userCreatedSub = this.firebase.userCreated.subscribe(elem => {
          console.log(elem)
          this.onCreatedUser(elem)
      });
      this.userDeletedSub = this.firebase.userDeleted.subscribe(elem => {
        console.log(elem)
        this.onDeleteUser(elem)
      });
      this.userUpdatedSub = this.firebase.userUpdated.subscribe(elem => {
        console.log(elem)
        this.onUpdateUser(elem)
      });
  }

  ngOnInit(): void{ 
    /*if(localStorage!.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')!)
      this.authService.createUser(user.email, user.password, user._token, user._expirationDate)
    }*/
    /*new Observable(observer =>{
      let count = 0
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000)
    }).subscribe(numero => {
      console.log(numero)
    })
  }*/
  }

  ngOnDestroy(): void {
    this.userCreatedSub.unsubscribe();
    this.userDeletedSub.unsubscribe();
    this.userUpdatedSub.unsubscribe();
    console.log('app destroyed');
  }

  onLogOut(){
    this.authService.logOut()
  }

  onCreatedUser(persona: User){
    /*console.log('getPersoneFirebase');
    const result = this.servizioProva.createUser(persona)

    if(!result){
      alert('Email già esistente.')
    }*/
    this.firebase.insertPersona(persona)
    .subscribe(data => {
      console.log(data);
     });
  }

  onDeleteUser(id: string): void {
    console.log('onDeleteUser ' + id);
    this.firebase.deletePersona(id)
    .subscribe(data => {
      console.log(data);
     });
  }

  onUpdateUser(updateUser: any){
    console.log('onUpdateUser ' + updateUser.id);
    const id = updateUser.id;

    this.firebase.patchPersona(id, updateUser)
    .subscribe(data => {
      console.log(data);
     });

  }
}
