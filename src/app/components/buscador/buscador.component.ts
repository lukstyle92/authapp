import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/interfaces/Receta.interface';
import { ApiBbddService } from 'src/app/services/api-bbdd.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  recetas: Receta[] = [];
  comprobador: boolean[] = [];
  termino: string;
  loading = false;
  constructor(private apiBbddService: ApiBbddService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.termino = params['termino'];
      this.apiBbddService
        .buscarReceta(this.termino)
        .pipe()
        .subscribe(response => {
          this.recetas = response.receta as Receta[];
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
          }
          this.router.navigate(['/buscar/', this.termino]);
        });
    });
    this.loading = false;
  }
}
