import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-barra-paginacion',
  templateUrl: './barra-paginacion.component.html',
  styleUrls: ['./barra-paginacion.component.css']
})
export class BarraPaginacionComponent {

  @Output() emitirBusqueda:EventEmitter<DatosNavegacionPorPagina> = new EventEmitter<DatosNavegacionPorPagina>()
  @Input() datosPageable!:RespuestaPageable<any>;

  get totalItems(){
    return this.datosPageable.total_elementos;
  }
  get totalPages(){
    return this.datosPageable.ultima_pagina;
  }

  get rangeStart(){
    //return this.datosPageable.pageable.offset;
    return this.datosPageable.nro_desde;
  }
  get rangeEnd(){
    //return (this.datosPageable.last) ? this.datosPageable.totalElements : this.datosPageable.pageable.offset+this.datosPageable.size;
    return this.datosPageable.nro_hasta;
  }
  set currentPage(value:number){
    this.datosPageable.pagina_actual=value;
  }
  get currentPage(){
      if(this.datosPageable.pagina_actual > this.totalPages){
        this.datosPageable.pagina_actual = this.totalPages;
        this.loadData();
      }
      return this.datosPageable.pagina_actual;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadData();
    }
  }
  loadData(){
    var datosNav = new DatosNavegacionPorPagina();
    datosNav.pageSize = this.datosPageable.cantidad_por_pagina;
    datosNav.nroPagina = this.currentPage;
    this.emitirBusqueda.emit(datosNav);
  }
}

//Clases para que esto funcion bien:
export class DatosNavegacionPorPagina{
  public nroPagina:number=1;
  public pageSize:number=3;
}
export class RespuestaPageable<t> {
  public datos!: t[];
  public cantidad_por_pagina!:number;
  public pagina_actual!:number;
  public nro_desde!:number;
  public nro_hasta!:number;
  public ultima_pagina!:number;
  public total_elementos!:number;
}
