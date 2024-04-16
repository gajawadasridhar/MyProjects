import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {

  constructor(private router: Router) { }

  /**
   * Navigate to the login page.
   */
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to the signup page.
   */
  navigateToSignUp(): void {
    this.router.navigate(['/signup']);
  }

}
