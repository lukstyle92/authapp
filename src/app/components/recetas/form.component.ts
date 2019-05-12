import { Component, OnInit } from '@angular/core';
import { Receta } from '../../interfaces/Receta.interface';
import { ApiBbddService } from '../../services/api-bbdd.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  receta: Receta = new Receta();
  creando: boolean;
  titulo = 'Crear receta';
  errores: string[];
  tipos: string[] = ['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena'];
  cantidadComensales: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  dificultades: string[] = [
    'Muy fácil',
    'Fácil',
    'Media',
    'Dificil',
    'Muy dificil'
  ];
  private fotoSeleccionada: File;
  progreso = 0;
  fotoValida: boolean;

  constructor(
    private apiBbddService: ApiBbddService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarReceta();
  }

  public cargarReceta(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.apiBbddService
          .getRecetaById(id)
          .subscribe(receta => (this.receta = receta));
      }
    });
  }

  public create(): void {
    this.creando = true;
    this.apiBbddService.create(this.receta).subscribe(
      receta => {
        this.receta = receta;
        console.log('hola' + receta.id);
        this.subirFoto();
        this.router.navigate(['/home']);
        this.creando = false;
        swal.fire(
          'Nueva receta',
          `La receta ${receta.nombre} ha sido creada con éxito`,
          'success'
        );
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    this.apiBbddService.update(this.receta).subscribe(
      json => {
        this.router.navigate(['/home']);
        swal.fire('Receta Acualizada', `${json.mensaje}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  prueba() {
    return { 'is-invalid': this.receta.nombre != null };
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    // console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser del tipo imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    } else {
      this.fotoValida = true;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.apiBbddService
        .subirFoto(this.fotoSeleccionada, this.receta.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.receta = response.cliente as Receta;
            /*swal.fire(
              'La foto se ha subido correctamente!',
              response.mensaje,
              'success'
            );*/
          }
        });
    }
  }
}
