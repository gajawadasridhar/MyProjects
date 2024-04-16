import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service'; // Ensure this import path is correct
import { RegisterRequest } from '../models/register-request.model'; // Import the interface

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  // Initialize userData using the RegisterRequest interface
  userData: RegisterRequest = {
    userName: '',
    password: '',
    location: '',
    contactNumber: ''
  };
  errorMessage: string = '';

  constructor(private taskService: TaskService, private router: Router) { }

  onSignUp(): void {
    this.taskService.register(this.userData).subscribe({
      next: (user) => {
        console.log('Registration successful', user);
        this.router.navigate(['/login']); // Navigate to the login page on successful registration
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = 'Registration failed. Please check the details.';
      }
    });
  }
}
