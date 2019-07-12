import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    protected storage: StorageService,
    protected router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if (this.storage.getLocalUser()) { 
      return true;
    } else {
      this.router.navigate(['login'])
      return false;
    }

  }
}


