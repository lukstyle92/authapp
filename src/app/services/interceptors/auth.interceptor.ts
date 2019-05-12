import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginAuthService } from '../login-auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginAuthService: LoginAuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {
          if (this.loginAuthService.isAuthenticated()) {
            this.loginAuthService.logout();
          }
          this.router.navigate(['/login']);
        }
        if (e.status == 403) {
          swal.fire('Acceso denegado', `Hola ${this.loginAuthService.usuario.username} no tienes acceso a este recurso!`, 'warning');
          this.router.navigate(['/recetas']);
        }
        return throwError(e);
      })
    );
  }
}
