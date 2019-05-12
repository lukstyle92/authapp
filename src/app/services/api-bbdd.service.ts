import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEvent,
  HttpRequest
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Receta } from '../interfaces/Receta.interface';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginAuthService } from './login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiBbddService {
  private respuesta: any;
  // devuelve un json con todas las recetas que hay en bbdd
  readonly GET_RECETAS_URL: string =
    //'http://localhost:8080/recetas/rest/servicios/listareceta';
    'http://localhost:8080/rest/recetas';

  constructor(private http: HttpClient, private router: Router, private loginAuthService: LoginAuthService) {
    //console.log('Servicio lucas listo!');
  }

  getRespuesta() {
    console.log(this.respuesta);
    return this.respuesta;
  }

  getRecetas(page: number): Observable<any> {
    return this.http.get(this.GET_RECETAS_URL + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Receta[]).forEach(receta => {
          //console.log(receta.nombre);
        });
      }),
      map(
        (response: any) => {
          (response.content as Receta[]).map(receta => {
            receta.nombre = receta.nombre.toUpperCase();
            let datePipe = new DatePipe('es');
            // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')//formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
            return receta;
          });
          return response;
        },
        tap((response: any) => {
          (response.content as Receta[]).forEach(receta => {
            //console.log(receta.nombre);
          });
        })
      )
    );
  }

  getRecetaById(id): Observable<Receta> {
    return this.http.get<Receta>(`${this.GET_RECETAS_URL}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/recetas']);
          if (e.error.mensaje) {
            console.log(e.error.mensaje);
          }
        }
        return throwError(e);
      })
    );
  }

  // Inserta mediante post una receta en base de datos
  create(receta: Receta): Observable<Receta> {
    return this.http
      .post(this.GET_RECETAS_URL, receta)
      .pipe(
        map((response: any) => response.receta as Receta),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.log(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  update(receta: Receta): Observable<any> {
    return this.http
      .put<any>(`${this.GET_RECETAS_URL}/${receta.id}`, receta)
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.log(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Receta> {
    return this.http
      .delete<Receta>(`${this.GET_RECETAS_URL}/${id}`)
      .pipe(
        catchError(e => {
          if (e.error.mensaje) {
            console.log(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    const req = new HttpRequest(
      'POST',
      `${this.GET_RECETAS_URL}/upload`,
      formData,
      {
        reportProgress: true
      }
    );
    return this.http.request(req);
  }

  buscarReceta(termino: string): Observable<any> {
    return this.http.get(this.GET_RECETAS_URL + '/buscar/' + termino).pipe(
      map((response: any) => {
        if (response.receta) {
          (response.receta as Receta[]).map(receta => {
            receta.nombre = receta.nombre.toUpperCase();
            let datePipe = new DatePipe('es');
            // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')//formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
            return receta;
          });
        }
        return response;
      }
      )
    );
  }
}
