import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaskService } from './services/task.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { AuthPageComponent } from './auth-page/auth-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DashboardComponent,
    LoginComponent,
    TaskDetailComponent,
    EditTaskComponent,
    CreateTaskComponent,
    AuthPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule  
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
