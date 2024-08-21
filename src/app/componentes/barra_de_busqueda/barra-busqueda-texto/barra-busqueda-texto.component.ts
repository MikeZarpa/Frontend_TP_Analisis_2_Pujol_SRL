import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoDeComparacion } from 'src/app/clases/enums';
import { FiltroDetalle } from 'src/app/clases/utiles/filtro';

@Component({
  selector: 'app-barra-busqueda-texto',
  templateUrl: './barra-busqueda-texto.component.html',
  styleUrls: ['./barra-busqueda-texto.component.css']
})
export class BarraBusquedaTextoComponent implements OnInit{

  @Input() filtroDetalle!:FiltroDetalle<any>;
  @Input() opcionesNombre:string[] = ["Sin nombre"];
  @Input() opcionesValores:number[] = [];
  @Output() emisionDeFiltro: EventEmitter<void> = new EventEmitter<void>();
  
  criterios:any[] = [];


  ngOnInit(): void {
    this.filtroDetalle.tipoBusqueda = TipoDeComparacion.CONTIENE;
    this.criterios = this.opcionesNombre.map((nombre, index) => {
      const valor = this.opcionesValores[index] ?? '';
      return {nombre, valor}
    })
    this.filtroDetalle.campo = this.criterios[0].valor;
  }

  @Input() disponibleBuscarTodos:boolean = false;

  @Output() buscarTodos: EventEmitter<void> = new EventEmitter<void>();

  emitir(){
    this.emisionDeFiltro.emit();
  }
  limpiar(){
    this.filtroDetalle.terminosDeBusqueda = [""];
    this.emitir();
  }
}
