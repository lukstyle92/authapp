import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(next);
    if (this.auth.isAuthenticated()) {
      console.log('Paso el guard');
    } else {
      console.error('Bloqueado por el guard');
      this.router.navigate(['/home']);
      swal.fire(
        'Acceso denegado',
        'Debes estar logado para acceder al recurso',
        'error'
      );
    }
    return this.auth.isAuthenticated();
  }
}
