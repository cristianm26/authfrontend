import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router) {

    }

    token: any;
    canActivate(): any {

        this.token = localStorage.getItem('token');
        if (this.token) {
            return true;
        } else {
            this.router.navigate(['login'])
        }
    }

}