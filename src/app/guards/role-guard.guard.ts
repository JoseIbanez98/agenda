import { CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({providedIn:'root'})
export class RoleGuard implements CanActivate{
  constructor(private auth: AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot,): boolean {
      const exceptedRoles=route.data['roles'] as number[];
      const userRole=Number(this.auth.getRoleFromToken());
      if(exceptedRoles.includes(userRole)) return true;
      // this.router.navigate(['/login'])
      return false;
    }
}
