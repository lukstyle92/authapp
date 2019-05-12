import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { LoginAuthService } from '../login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {



  constructor(private loginAuthService: LoginAuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loginAuthService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let role = next.data['role'] as string;
    console.log(role);
    if (this.loginAuthService.hasRole(role)) {
      return true;
    }
    swal.fire('Acceso denegado', `Hola ${this.loginAuthService.usuario.username} no tienes acceso a este recurso!`, 'warning');
    this.router.navigate(['/clientes']);
    return false;
  }
}
