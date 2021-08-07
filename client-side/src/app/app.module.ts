import { AuthGuardLoggedIn } from "./services/loggedIn.guard";
import { AuthGuard } from "./services/auth.guard";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TaskViewComponent } from "./components/task-view/task-view.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NewListComponent } from "./components/new-list/new-list.component";
import { NewTaskComponent } from "./components/new-task/new-task.component";
import { LoginComponent } from "./components/login/login.component";
import { Interceptor } from "./interceptor/interceptor";
import { SignupComponent } from "./components/signup/signup.component";
import { EditListComponent } from "./components/edit-list/edit-list.component";
import { EditTaskComponent } from "./components/edit-task/edit-task.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from "ngx-ui-loader";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#ff792c",
  bgsOpacity: 0.5,
  bgsPosition: "bottom-right",
  bgsSize: 60,
  bgsType: "ball-spin-clockwise",
  blur: 0,
  delay: 0,
  // fastFadeOut: true,
  fgsColor: "#ff792c",
  fgsPosition: "center-center",
  fgsSize: 60,
  fgsType: "ball-spin-clockwise",
  gap: 24,
  logoPosition: "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(40,40,40,0)",
  pbColor: "#ff792c",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  maxTime: -1,
  minTime: 300,
};

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginComponent,
    SignupComponent,
    EditListComponent,
    EditTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [
    AuthGuard,
    AuthGuardLoggedIn,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
