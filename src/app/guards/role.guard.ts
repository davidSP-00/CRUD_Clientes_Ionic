import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService:AuthService,
    private router:Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(!this.authService.isAuthenticated){
            this.router.navigate(['login']);
            return false;
        }

        let role=next.data['role'] as string;
        if(this.authService.hasRole(role)){
            return true;
        }
        this.router.navigate(['contenido']);
        return false;
        


    }


}