import { Component, EventEmitter, Input, OnInit, Output, Predicate, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoDeComparacion } from 'src/app/clases/enums';
import { FiltroDetalle } from 'src/app/clases/utiles/filtro';

@Component({
  selector: 'app-barra-filtro-fecha',
  templateUrl: './barra-filtro-fecha.component.html',
  styleUrls: ['./barra-filtro-fecha.component.css']
})
export class BarraFiltroFechaComponent implements OnInit {
  @Input() filtroDetalle!:FiltroDetalle<any>;
  @Input() campoAAplicarElFiltro!:string;
  @Output() emisionDeFiltro: EventEmitter<Predicate<Date>> = new EventEmitter<Predicate<Date>>();  
  dateRangeForm: FormGroup;
  formBuilder = inject(FormBuilder);
  filtro = (fecha:Date) => true;

  constructor() {
    this.dateRangeForm = this.formBuilder.group({
      startDate: new Date().toISOString().substring(0, 10),
      endDate: new Date().toISOString().substring(0, 10),
      useFilter: false,
    });
   }

  ngOnInit() {    
    if(this.filtroDetalle.enabled)
      this.dateRangeForm.patchValue({
        startDate: new Date(this.filtroDetalle.terminosDeBusqueda[0]).toISOString().substring(0, 10),
        endDate: new Date(this.filtroDetalle.terminosDeBusqueda[1]).toISOString().substring(0, 10),
        useFilter: true,
      });
  }

  reset(){
    this.dateRangeForm.patchValue({
      startDate: new Date().toISOString().substring(0, 10),
      endDate: new Date().toISOString().substring(0, 10),
      useFilter: false,
    });
  }
  get useFilter() {
    return this.dateRangeForm.get('useFilter')!.value;
  }

  get formattedStartDate() {
    const startDate = this.dateRangeForm.get('startDate')!.value;
    return startDate ? new Date(startDate).toISOString().substring(0,10) : '';
  }

  get formattedEndDate() {
    const endDate = this.dateRangeForm.get('endDate')!.value;
    return endDate ? new Date(endDate).toISOString().substring(0,10) : '';
  }

  obtenerFiltro():Predicate<Date>{
    const datos = this.dateRangeForm.value;
    if(!datos.useFilter)
      return ((date:Date) => true);
    return ((date:Date) =>{
      return (date >= new Date(datos.startDate))&&(date<=new Date(datos.endDate));});
  }
  emitirFiltroSioSi(){
    const datos = this.dateRangeForm.value;
    if(datos.useFilter){
      this.filtroDetalle.terminosDeBusqueda=[this.formattedStartDate,this.formattedEndDate];
    } 
    else
      this.filtroDetalle.terminosDeBusqueda=[""];
    this.filtroDetalle.campo = this.campoAAplicarElFiltro;
    this.filtroDetalle.tipoBusqueda = TipoDeComparacion.DESDE_Y_HASTA;
    //console.log(this.filtroDetalle);
    
    
    this.emisionDeFiltro.emit();
  }

  emitirFiltro(){
    const datos = this.dateRangeForm.value;
    if(datos.useFilter)
      this.emitirFiltroSioSi()
    /*
    this.emisionDeFiltro.emit(this.obtenerFiltro());*/
  }
  verTodos(){
    this.reset();
    this.emitirFiltroSioSi();
  }
}