import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router here
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  taskId: number = 0; // Assuming `0` is an invalid ID and used only for initialization
  task: Task | null = null;

  // Add Router to the constructor parameters
  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id'];
      this.loadTaskDetails();
    });
  }

  // Method to navigate back to the dashboard
  goBack(): void {
    this.router.navigate(['/dashboard']); // Use the injected router to navigate
  }
  
  // Method to load task details
  loadTaskDetails(): void {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: task => {
        this.task = task;
      },
      error: err => {
        console.error('Error fetching task details:', err);
      }
    });
  }
}
