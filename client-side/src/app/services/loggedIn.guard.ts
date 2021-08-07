import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class AuthGuardLoggedIn implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("user-id")) {
      // not logged in so return false
      this.router.navigate(["/lists"], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    // logged in
    return true;
  }
}
