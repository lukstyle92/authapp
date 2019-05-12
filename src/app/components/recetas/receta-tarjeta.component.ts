import { Component, OnInit } from '@angular/core';
import { ApiBbddService } from '../../services/api-bbdd.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Receta } from 'src/app/interfaces/Receta.interface';

@Component({
  selector: 'app-receta-tarjeta',
  templateUrl: './receta-tarjeta.component.html',
  styles: []
})
export class RecetaTarjetaComponent implements OnInit {
  recetas: Receta[] = [];
  contador = 0;
  paginador: any;
  comprobador: boolean[] = [];
  loading: boolean;
  creando: boolean;

  constructor(
    public apiBbddService: ApiBbddService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.apiBbddService
        .getRecetas(page)
        .pipe(
          tap(response => {
            (response.content as Receta[]).forEach(response => {
              /*console.log(response.path);
            console.log(response.nombre);*/
            });
          })
        )
        .subscribe(response => {
          this.recetas = response.content as Receta[];
          this.comprobador = [];
          if (this.recetas) {
            for (let i = 0; i < this.recetas.length; i++) {
              let regex = '[https]*';
              let re = /https/gi;
              if (this.recetas[i].path) {
                let puta = this.recetas[i].path.search(re) != -1;
                this.comprobador[i] = puta;
              } else if (!this.recetas[i].path) {
                this.comprobador[i] = true;
              } else {
                this.comprobador[i] = false;
              }
            }
            console.log(this.recetas);
          }
          this.paginador = response;
          this.loading = false;
        });
    });
  }
}
