import { Factura } from 'src/app/clases/base_de_datos/comercial/factura';
import { Component, inject } from '@angular/core';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { FacturaService } from 'src/app/servicios/comercial/factura.service';
import { Filtro } from 'src/app/clases/dtos/filtro';
import { EnumFiltroFactura, EstadoDelFormulario, TipoDeComparacion } from 'src/app/clases/enums';

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturasComponent {
  readonly EnumEstadoDelFormulario = EstadoDelFormulario;
  estadoFormulario = EstadoDelFormulario.Base;

  estadoFormularioAnterior!:EstadoDelFormulario;
  facturaSeleccionada:Factura|null = null;

  facturas:Factura[] = [];

  //Para la barra de navegación de paginas
  datosPageable: RespuestaPageable<Factura>|null = null;
  datosDeLaBarra:DatosNavegacionPorPagina|null=null;

  ver_detalles_de_la_factura(factura:Factura){
    this.facturaSeleccionada = factura;
    this.estadoFormularioAnterior = this.estadoFormulario;
    this.estadoFormulario = EstadoDelFormulario.ViendoDatosAdjuntos;
  }

  readonly servicio = inject(FacturaService);

  buscar(){
    //Actualizamos el filtro antes de mandar
    this.filtro.comprobar();
    console.log(this.filtro);
    

    ((this.datosDeLaBarra!=null) ? this.servicio.obtenerTodosConPagina(this.filtro,this.datosDeLaBarra) : this.servicio.obtenerTodosConPagina(this.filtro ))
    .subscribe(
      res =>{
        this.facturas = res.datos;this.datosPageable = res;});
  }

  barraPageable(datos:DatosNavegacionPorPagina){
    this.datosDeLaBarra=datos;
    this.buscar();
  }

  volverABase(){
    this.facturaSeleccionada = null;
    this.estadoFormulario = this.estadoFormularioAnterior;
  }

  //Filtros

  filtro = new Filtro<EnumFiltroFactura>();
  readonly EnumFiltroFactura = EnumFiltroFactura;
  readonly TipoDeComparacion = TipoDeComparacion;

  constructor(){
    this.filtro.setCantidadFilters(3);
  }
}