import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user } from '../../modelli/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  user: user | null = null;

  constructor(private authService: AuthService, private router: Router) {
    authService.currentUser$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = authService.isLogged;
    })
  }

  onLogOut(){
    this.authService.logOut()
    this.router.navigate(['/singin'])
  }

}
