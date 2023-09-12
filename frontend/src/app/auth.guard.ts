import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

export const authGuard: CanActivateFn = (route, state) => {
  const _routeSnapshot: ActivatedRouteSnapshot = route;
  const _state: RouterStateSnapshot = state;
  const _authService = inject(AuthService);
  const _router = inject(Router);

  if (!_authService.loggedIn()) {
    _router.navigate(['/login']);
    return false;
  }
  return true;
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private _authService: AuthService;
  private _router: Router;
  constructor(http: HttpClient) {
    this._authService = new AuthService(http)
    this._router = new Router()
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
}
