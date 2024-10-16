import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, NgForm, } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { user } from '../../modelli/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthInterceptor } from '../../auth/auth.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule, RouterModule],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.css'
})
export class SinginComponent {
  user: user | null = null;

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
  }

  async onSubmit(form: NgForm): Promise<void> {
    const email = form.value.email
    const password = form.value.password
    this.authService.singIn(email, password).subscribe({
      next:(data: any) => {
        console.log(data)
        this.router.navigate(['/welcome'])
      },
      error:(error => this.snackbar.open(error.message, 'Close', {duration: 5000}))
    })
    //form.reset()
  }
}


