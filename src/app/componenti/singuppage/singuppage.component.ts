import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singuppage',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './singuppage.component.html',
  styleUrl: './singuppage.component.css'
})
export class SinguppageComponent {

  constructor(private router: Router) {}

  onSingup(){
    this.router.navigate(['/singin'])
  }
}
