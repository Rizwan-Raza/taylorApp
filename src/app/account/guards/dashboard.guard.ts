import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private _loginService: LoginService, private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._loginService.isAuthenticated()) {
      console.log("Allow Dash: " + state.url);
      if (state.url.endsWith("/")) {
        this._router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }
    console.log("Redirect Login");
    this._router.navigate(['/login']);
    return false;
  }

}
