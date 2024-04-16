import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task: Task | null = null;

  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.taskService.getTaskById(id).subscribe(task => this.task = task);
    });
  }
 
  updateTask(): void {
    if (this.task) {
      this.taskService.updateTask(this.task.id, this.task).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']); // Navigate back to the dashboard on successful update
        },
        error: (err) => {
          console.error('Failed to update task:', err);
          // Optionally handle errors, e.g., show an error message to the user
        }
      });
    } else {
      console.error('No task data available to update.');
      // Optionally handle the case where task data isn't loaded
    }
  }

  goBack(): void { this.router.navigate(['/dashboard']); // Adjust the route as necessary }
}
}
