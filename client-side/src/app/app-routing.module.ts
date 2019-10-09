import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';


const routes: Routes = [
  {path:'' , redirectTo:"lists",pathMatch:"full", data: {animation: 'Main'}},
  {path:'new-list' , component:NewListComponent, data: {animation: 'newList'}},
  {path:'edit-list/:listId' , component:EditListComponent, data: {animation: 'editList'}},
  {path:'login' , component:LoginComponent, data: {animation: 'Login'}},
  {path:'signup' , component:SignupComponent, data: {animation: 'Signup'}},
  {path:'lists' , component:TaskViewComponent , data: {animation: 'Lists'}},
  {path:'lists/:listId' , component:TaskViewComponent , data: {animation: 'myLists'}},
  {path:'lists/:listId/new-task' , component:NewTaskComponent, data: {animation: 'newTask'}},
  {path:'lists/:listId/edit-task/:taskId' , component:EditTaskComponent, data: {animation: 'editTask'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
