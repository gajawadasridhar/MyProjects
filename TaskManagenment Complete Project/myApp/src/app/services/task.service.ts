import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model'; // Assuming this model matches your TaskDto
import { TaskEdit } from '../models/taskEdit.model';
import { User } from '../models/user.model';
import { RegisterRequest } from '../models/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7281/api/tasks'; // Adjust this URL based on your environment

  constructor(private http: HttpClient) { }

  // Method to retrieve all tasks
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Method to retrieve a task by ID
  getTaskById(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  // Method to delete a task by ID
  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  // Method to update a task
  updateTask(id: number, task: Task): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, task);
  }

  
  createTask(task: TaskEdit): Observable<any> {  // Ensure parameter type is TaskEdit
    return this.http.post<any>(this.apiUrl, task);
  }

  login(userName: string, password: string): Observable<User> {
    const url = `${this.apiUrl }/login`;
    return this.http.post<User>(url, { userName, password });
  }

  register(registerData: RegisterRequest): Observable<User> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<User>(url, registerData);
  }
 // Method to update the status of a task to 'completed' using only task ID
 updateTaskStatus(taskId: number): Observable<any> {
  const url = `${this.apiUrl}/update-status/${taskId}`;
  // No need to send status data; backend handles it
  return this.http.post(url, {});
}
}
