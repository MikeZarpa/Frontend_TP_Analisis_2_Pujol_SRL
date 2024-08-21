import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoDeComparacion } from 'src/app/clases/enums';
import { FiltroDetalle } from 'src/app/clases/utiles/filtro';

@Component({
  selector: 'app-barra-filtro-desplegable',
  templateUrl: './barra-filtro-desplegable.component.html',
  styleUrls: ['./barra-filtro-desplegable.component.css']
})
export class BarraFiltroDesplegableComponent {
  @Input() filtroDetalle!:FiltroDetalle<any>
  @Output() eventoEmision: EventEmitter<void> = new EventEmitter<void>();
  @Input() label_titulo:string = "Opciones";
  @Input() campo!:number;
  @Input() opcionesNombre:string[] = ["Sin nombre"];
  @Input() opcionesValores:number[] = [];
  @Input() tipoDeComparacion:TipoDeComparacion = TipoDeComparacion.LITERAL;
  opciones:{nombre:string,valor:number}[] = [];

  ngOnInit(): void {
    this.filtroDetalle.tipoBusqueda = this.tipoDeComparacion;
    this.opciones =  this.opcionesNombre.map(
      (nombre, index) => {
        const valor = this.opcionesValores[index] ?? '';
        return {nombre, valor}
    });
    this.filtroDetalle.campo = this.campo;
  }


  emitir(){
    this.eventoEmision.emit();
  }
}
