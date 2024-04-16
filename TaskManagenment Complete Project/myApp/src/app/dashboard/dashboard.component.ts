import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = []; // Array to store tasks fetched from the server

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks(); // Load tasks on component initialization
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks; // Assign fetched tasks to the component's task array
      },
      error: (err) => console.error('Failed to fetch tasks:', err) // Handle errors
    });
  }

  onCreateTask(): void {
    this.router.navigate(['/create-task']); // Navigate to the task creation form
  }

  onViewTask(taskId: number): void {
    this.router.navigate(['/task-detail', taskId]); // Navigate to the task detail view
  }

  onEditTask(taskId: number): void {
    this.router.navigate(['/edit-task', taskId]); // Navigate to the task edit form
  }

  onDeleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.loadTasks(); // Reload tasks after a successful deletion
      },
      error: (err) => console.error('Error deleting task:', err) // Handle errors
    });
  }
  completeTask(taskId: number): void {
    this.taskService.updateTaskStatus(taskId).subscribe({
      next: () => {
        alert('Task marked as complete!'); // Provide user feedback
        this.loadTasks(); // Reload tasks to reflect the updated status
      },
      error: (err) => {
        console.error('Error updating task status:', err);
        alert('Failed to update task status.'); // Provide error feedback
      }
    });
  
  }
  calculateTimeSpent(addedDate: Date): string {
    if (!addedDate) return '---'; // If no addedDate provided, return placeholder
    const currentTime = new Date().getTime();
    const addedTime = new Date(addedDate).getTime();
    const timeDiff = currentTime - addedTime; // Difference in milliseconds

    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hrs, ${minutes} mins`; // Return formatted string
  }
}
