import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TaskViewComponent } from "./components/task-view/task-view.component";
import { NewListComponent } from "./components/new-list/new-list.component";
import { NewTaskComponent } from "./components/new-task/new-task.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { EditListComponent } from "./components/edit-list/edit-list.component";
import { EditTaskComponent } from "./components/edit-task/edit-task.component";
import { AuthGuard } from "./services/auth.guard";
import { AuthGuardLoggedIn } from "./services/loggedIn.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "lists",
    pathMatch: "full",
    data: { animation: "Main" },
    canActivate: [AuthGuard],
  },
  {
    path: "new-list",
    component: NewListComponent,
    data: { animation: "newList" },
    canActivate: [AuthGuard],
  },
  {
    path: "edit-list/:listId",
    component: EditListComponent,
    data: { animation: "editList" },
    canActivate: [AuthGuard],
  },
  {
    path: "lists",
    component: TaskViewComponent,
    data: { animation: "Lists" },
    canActivate: [AuthGuard],
  },
  {
    path: "lists/:listId",
    component: TaskViewComponent,
    data: { animation: "myLists" },
    canActivate: [AuthGuard],
  },
  {
    path: "lists/:listId/new-task",
    component: NewTaskComponent,
    data: { animation: "newTask" },
    canActivate: [AuthGuard],
  },
  {
    path: "lists/:listId/edit-task/:taskId",
    component: EditTaskComponent,
    data: { animation: "editTask" },
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    data: { animation: "Login" },
    canActivate: [AuthGuardLoggedIn],
  },
  {
    path: "signup",
    component: SignupComponent,
    data: { animation: "Signup" },
    canActivate: [AuthGuardLoggedIn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
