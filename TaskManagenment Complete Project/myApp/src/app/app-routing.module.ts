import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskDetailComponent } from './task-detail/task-detail.component'; // Import TaskDetailComponent
import { EditTaskComponent } from './edit-task/edit-task.component';
import { CreateTaskComponent } from './create-task/create-task.component'; 

import { AuthPageComponent } from './auth-page/auth-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'edit-task/:id',  // 'id' is a route parameter
    component: EditTaskComponent
  }, { path: 'create-task', component: CreateTaskComponent },
  { path: 'task-detail/:id', component: TaskDetailComponent }, // Configure route for TaskDetailComponent
  { path: '', redirectTo: '/auth', pathMatch: 'full' },  // Redirect to /auth as default
  { path: 'auth', component: AuthPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
