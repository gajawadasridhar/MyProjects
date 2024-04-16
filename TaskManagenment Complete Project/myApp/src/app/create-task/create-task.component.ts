import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskEdit } from '../models/taskEdit.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  task: TaskEdit = {
    name: '',  // Initializing only the required properties
    description: '',
    priority: 0,
    status: ''
  };

  constructor(private taskService: TaskService, private router: Router) {}

  createTask(): void {
    this.taskService.createTask(this.task).subscribe({
      next: () => {
        console.log('Navigation to dashboard triggered');
        this.router.navigate(['/dashboard']).then(success => {
          console.log('Navigation success:', success);
        }).catch(err => {
          console.error('Navigation error:', err);
        });
      },
      error: (err) => {
        console.error('Failed to create task', err);
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/dashboard']); // Adjust this if your dashboard route is different
  }
}
