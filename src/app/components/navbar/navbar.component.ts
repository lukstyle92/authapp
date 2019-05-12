import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import swal from 'sweetalert2';
import { Receta } from 'src/app/interfaces/Receta.interface';
import { ApiBbddService } from 'src/app/services/api-bbdd.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  title: string = 'tus recetas';
  recetas: Receta[] = [];
  encuentra = false;

  constructor(private loginAuthService: LoginAuthService, private apiBbddService: ApiBbddService, private router: Router, private activatedRoute: ActivatedRoute) { }

  logout(): void {
    let username = this.loginAuthService.usuario.username;
    this.loginAuthService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

  buscarReceta(termino: string) {
    if (termino.length > 0) {
      this.router.navigate(['/buscar', termino]);
    }
  }
}
