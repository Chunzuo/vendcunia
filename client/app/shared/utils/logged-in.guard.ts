/* tslint:disable max-line-length */
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthServiceApp } from '../services/auth/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(
        private authService: AuthServiceApp,
        private router: Router
    ) {}

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        /*if (this.authService.isLoggedIn() == false) {
            this.router.navigateByUrl('/');
            return false;
        }*/
        return true;
    }
}