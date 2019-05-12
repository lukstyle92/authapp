import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/interfaces/Receta.interface';
import { ActivatedRoute } from '@angular/router';
import { ApiBbddService } from 'src/app/services/api-bbdd.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-receta-individual',
  templateUrl: './receta-individual.component.html'
})
export class RecetaIndividualComponent implements OnInit {
  receta: Receta;
  comprobador: boolean;
  ingredientes: string[] = [];
  preparacion: string[] = [];

  constructor(private apiBbddService: ApiBbddService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      console.log(id);
      this.apiBbddService
        .getRecetaById(id)
        .subscribe(response => {
          console.log(response);
          this.receta = response as Receta;
          this.preparacion = this.receta.preparacion.split(";");
          this.ingredientes = this.receta.ingredientes.split(";");
          // this.ingredientes = this.ingredientes.slice(this.ingredientes.length-1, 1);
          console.log(this.preparacion);
          this.comprobador = false;
          if (this.receta) {
              let regex = '[https]*';
              let re = /https/gi;
              if (this.receta.path) {
                this.comprobador = this.receta.path.search(re) != -1;
              } else if (!this.receta.path) {
                this.comprobador = true;
              } else {
                this.comprobador = false;
              }
            console.log(this.comprobador);
          }
        });
    });
    loading = false;
  }

}
