import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(private taskService: TaskService, private router: Router) { }

  onLogin(): void {
    this.taskService.login(this.userName, this.password).subscribe({
      next: (user) => {
        console.log('Login successful', user);
        this.router.navigate(['/dashboard']); // Navigate to the dashboard on success
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your username and password.';
      }
    });
  }
}
