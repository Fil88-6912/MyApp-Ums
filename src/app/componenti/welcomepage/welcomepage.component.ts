import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css'
})
export class WelcomepageComponent {

  constructor(private router: Router) {}

  onLogin(){
    this.router.navigate(['/homepage'])
  }

}
