import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { HttpParams } from '@angular/common/http';
import { Factura } from 'src/app/clases/base_de_datos/comercial/factura';
import { Filtro } from 'src/app/clases/dtos/filtro';

@Injectable({
  providedIn: 'root'
})
export class FacturaService extends DatosDeConexion{

  constructor() {
    super();
  }
  /*
  public obtenerTodosSinPagina():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.urlConexionBase+"/marca.php?no_paginar=true");
  }*/
  public obtenerTodosConPagina(filtro:Filtro<any>, datosPagina:DatosNavegacionPorPagina = {nroPagina:1,pageSize:10}):Observable<RespuestaPageable<Factura>>{  
    const filtroJSON = JSON.stringify(filtro);      
    let params = new HttpParams()
    .set('nroPagina', datosPagina.nroPagina.toString())
    .set('pageSize', datosPagina.pageSize.toString())
    .set('filtro',filtroJSON);      
    return this.http.get<RespuestaPageable<Factura>>(this.urlConexionBase+"/ventas/factura_venta.php",{ params: params });
   }


   public obtenerFacturaCompletaPorID(id_factura:number):Observable<Factura>{
    let params = new HttpParams()
    .set('id_factura_venta', id_factura);
    return this.http.get<Factura>(this.urlConexionBase+"/ventas/factura_venta.php",{ params: params });
   }
}