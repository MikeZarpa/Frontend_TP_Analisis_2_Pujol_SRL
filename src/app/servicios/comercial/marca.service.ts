import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Marca } from 'src/app/clases/base_de_datos/comercial/marca';
import { Observable } from 'rxjs';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { HttpParams } from '@angular/common/http';
import { Filtro } from 'src/app/clases/utiles/filtro';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends DatosDeConexion{

  constructor() {
    super();
  }

  public obtenerTodosSinPagina():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.urlConexionBase+"/marca.php?no_paginar=true");
  }
  public obtenerTodosConPagina(filtro:Filtro<any>,datosPagina:DatosNavegacionPorPagina = {nroPagina:1,pageSize:10}):Observable<RespuestaPageable<Marca>>{  
    const filtroJSON = JSON.stringify(filtro);      
    let params = new HttpParams()
    .set('nroPagina', datosPagina.nroPagina.toString())
    .set('pageSize', datosPagina.pageSize.toString())
    .set('filtro',filtroJSON);      
    return this.http.get<RespuestaPageable<Marca>>(this.urlConexionBase+"/marca.php",{ params: params });
   }

  public crear_marca(marca:Marca):Observable<void>{
    return this.http.post<void>(this.urlConexionBase+"/marca.php",marca);
  }
  public actualizar_marca(marca:Marca):Observable<void>{
    return this.http.put<void>(this.urlConexionBase+"/marca.php",marca);
  }
  public borrar(id_marca:number):Observable<void>{
    return this.http.delete<void>(this.urlConexionBase+"/marca.php",{body:{id_marca}});
  }
}