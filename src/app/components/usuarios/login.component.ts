import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginAuthService } from '../../services/login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    titulo: string = 'Por favor Sign In!';
    usuario: Usuario;

    constructor(private loginAuthService: LoginAuthService, private router: Router) {
      this.usuario = new Usuario();
    }

    ngOnInit() {
      if (this.loginAuthService.isAuthenticated()) {
        swal.fire('Login', `Hola ${this.loginAuthService.usuario.username} ya estás autenticado!`, 'info');
        this.router.navigate(['/clientes']);
      }
    }

    login(): void {
      console.log(this.usuario);
      if (this.usuario.username == null || this.usuario.password == null) {
        swal.fire('Error Login', 'Username o password vacías!', 'error');
        return;
      }

      this.loginAuthService.login(this.usuario).subscribe(response => {
        console.log(response);

        this.loginAuthService.guardarUsuario(response.access_token);
        this.loginAuthService.guardarToken(response.access_token);
        let usuario = this.loginAuthService.usuario;
        this.router.navigate(['/clientes']);
        swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      }, err => {
        if (err.status == 400) {
          swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
      );
    }
}
