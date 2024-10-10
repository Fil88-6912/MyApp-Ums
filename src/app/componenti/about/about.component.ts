import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContattoComponent } from '../contatto/contatto.component';
import { FirebaseService, User } from '../../servizi/firebase.service';
import { FormsModule, NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule, CommonModule, ContattoComponent, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  userform: any
  persona: any
  user$: Observable<User | null> = of(null);
  originalUser: Partial<User> = {};
  isUser: boolean = true
  user: User = {
    nome: "UserProva",
    email: "userProva@yellow.it",
    id: "-abc123"
  }

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.userform = new FormGroup({
      nome: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      userId: new FormControl(null, Validators.required),
    });
  }

  onSubmit(form: NgForm){}

  resetForm(form: NgForm) {

  }
}
