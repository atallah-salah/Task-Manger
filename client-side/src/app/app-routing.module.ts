import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path:'' , redirectTo:"lists",pathMatch:"full"},
  {path:'new-list' , component:NewListComponent},
  {path:'login' , component:LoginComponent},
  {path:'lists' , component:TaskViewComponent },
  {path:'lists/:listId' , component:TaskViewComponent },
  {path:'lists/:listId/new-task' , component:NewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
