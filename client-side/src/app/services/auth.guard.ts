import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("user-id")) {
      // logged in so return true
      return true;
    }
    console.log(9954954, "check");

    // not logged in so redirect to login page with the return url
    // this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    this.router.navigateByUrl("/login");

    return false;
  }
}
