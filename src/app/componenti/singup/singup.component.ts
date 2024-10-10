import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule, MatSnackBarModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {}

  ngOnInit(): void{}

  onSubmit(form: NgForm){
    const email = form.value.email
    const password = form.value.password
    this.authService.singUp(email, password).subscribe({
      next:(data) => {
        console.log(data)
        this.router.navigate(['/success'])
      },
      //error:(error => alert(error.message))
      error:(error => this.snackbar.open(error.message, 'Close', {duration: 5000}))
    })
    //form.reset()
  }
  
}
