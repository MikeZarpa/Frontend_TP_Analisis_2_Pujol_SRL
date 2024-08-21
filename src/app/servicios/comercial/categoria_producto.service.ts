import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { HttpParams } from '@angular/common/http';
import { Filtro } from 'src/app/clases/utiles/filtro';
import { Categoria } from 'src/app/clases/base_de_datos/comercial/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService extends DatosDeConexion{

  constructor() {
    super();
  }

  public obtenerTodosSinPagina():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlConexionBase+"/categoria.php?no_paginar=true");
  }

  public obtenerTodosConPagina(filtro:Filtro<any>,datosPagina:DatosNavegacionPorPagina = {nroPagina:1,pageSize:10}):Observable<RespuestaPageable<Categoria>>{  
    const filtroJSON = JSON.stringify(filtro);      
    let params = new HttpParams()
    .set('nroPagina', datosPagina.nroPagina.toString())
    .set('pageSize', datosPagina.pageSize.toString())
    .set('filtro',filtroJSON);      
    return this.http.get<RespuestaPageable<Categoria>>(this.urlConexionBase+"/categoria.php",{ params: params });
   }

  public crear_categoria(categoria:Categoria):Observable<void>{
    return this.http.post<void>(this.urlConexionBase+"/categoria.php",categoria);
  }
  public actualizar_categoria(categoria:Categoria):Observable<void>{
    return this.http.put<void>(this.urlConexionBase+"/categoria.php",categoria);
  }
  public borrar(id_categoria:number):Observable<void>{
    return this.http.delete<void>(this.urlConexionBase+"/categoria.php",{body:{id_categoria}});
  }
}