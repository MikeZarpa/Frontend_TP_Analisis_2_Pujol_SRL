import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/clases/base_de_datos/comercial/cliente';
import { HttpParams } from '@angular/common/http';
import { Filtro } from 'src/app/clases/dtos/filtro';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends DatosDeConexion{

  constructor() {
    super();
   }
    public obtenerTodosConPagina(filtro:Filtro<any>,datosPagina:DatosNavegacionPorPagina = {nroPagina:1,pageSize:10}):Observable<RespuestaPageable<Cliente>>{  
      const filtroJSON = JSON.stringify(filtro);
      let params = new HttpParams()
      .set('nroPagina', datosPagina.nroPagina.toString())
      .set('pageSize', datosPagina.pageSize.toString())
      .set('filtro',filtroJSON);          
      return this.http.get<RespuestaPageable<Cliente>>(this.urlConexionBase+"/cliente.php",{ params: params });
     }

    // public borrar(id:number):Observable<void>{
    //   return this.http.delete<void>(this.urlConexionBase+"/cliente.php?id_producto="+id);
    // }
      
    public obtenerTodosSinPagina():Observable<Cliente[]>{
      return this.http.get<Cliente[]>(this.urlConexionBase+"/cliente.php?no_paginar=true");
    }

    public crear_cliente(cliente:Cliente):Observable<void>{
      return this.http.post<void>(this.urlConexionBase+"/cliente.php",cliente);
    }
    public actualizar_cliente(cliente:Cliente):Observable<void>{
      return this.http.put<void>(this.urlConexionBase+"/cliente.php",cliente);
    }
    public borrar(id_cliente:number):Observable<void>{
      return this.http.delete<void>(this.urlConexionBase+"/cliente.php",{body:{id_cliente}});
    }
}
