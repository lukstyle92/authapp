import { Component, OnInit, Input } from '@angular/core';
import { Receta } from 'src/app/interfaces/Receta.interface';

@Component({
  selector: 'app-buscador-recetas',
  templateUrl: './buscador-recetas.component.html'
})
export class BuscadorRecetasComponent implements OnInit {
  @Input() recetas: Receta[] = [];
  @Input() comprobador: boolean[] = [];
  constructor() { }

  ngOnInit() {
  }

}
