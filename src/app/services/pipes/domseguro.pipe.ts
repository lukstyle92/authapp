import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {
  readonly GET_RECETAS_URL: string =
    'http://localhost:8080/recetas/rest/servicios/listareceta';
  constructor(private domSanatizer: DomSanitizer) { }

  transform(value: string): any {
    return this.domSanatizer.bypassSecurityTrustResourceUrl(
      this.GET_RECETAS_URL + value
    );
  }
}
