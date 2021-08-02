import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {}
  public loginError: any;
  public loading: any;

  startLoading() {
    this.loading = true;
    this.ngxService.startLoader("loader-02");
  }

  stopLoading() {
    this.ngxService.stopLoader("loader-02");
    setTimeout(() => {
      this.loading = false;
    }, 820);
  }

  validateForm(email: string, password: string) {
    let successCount = 0;
    if (email) {
      let re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(email)) {
        successCount += 1;
      } else {
        this.loginError = "Please Enter valid email address";
      }
    } else {
      this.loginError = "Please Enter email";
    }

    if (password) {
      successCount += 1;
    } else {
      this.loginError = "Please Enter password";
    }

    if (successCount === 2) {
      return true;
    } else {
      return false;
    }
  }

  onLoginClicked(email: string, password: string) {
    let validated: any = this.validateForm(email, password);

    if (!validated) {
      return;
    }

    this.startLoading();
    this.loginError = "";

    this.authService.login(email, password).subscribe(
      (res: HttpResponse<any>) => {
        this.stopLoading();

        if (res.status === 200) {
          this.router.navigate([`/lists`]);
        }
      },
      ({ error }) => {
        this.stopLoading();

        this.loginError = error.message;
        return error;
      }
    );
  }
}
