import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../../datos-de-conexion';
import { Usuario } from 'src/app/clases/base_de_datos/Usuario';
import { Observable } from 'rxjs';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { HttpParams } from '@angular/common/http';
import { Filtro } from 'src/app/clases/utiles/filtro';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends DatosDeConexion{

  constructor() {
    super();
   }

   public obtenerTodosSinPagina():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlConexionBase+"/usuario/usuario.php?no_paginar=true");
   }

  public obtenerTodosConPagina(filtro:Filtro<any>, datosPagina:DatosNavegacionPorPagina = {nroPagina:1,pageSize:10}):Observable<RespuestaPageable<Usuario>>{    
    const filtroJSON = JSON.stringify(filtro);
    let params = new HttpParams()
    .set('nroPagina', datosPagina.nroPagina.toString())
    .set('pageSize', datosPagina.pageSize.toString())
    .set('filtro',filtroJSON);      

    return this.http.get<RespuestaPageable<Usuario>>(this.urlConexionBase+"/usuario/usuario.php",{ params: params });
  }

  public crear_usuario(usuario:Usuario):Observable<void>{
    return this.http.post<void>(this.urlConexionBase+"/usuario/usuario.php",usuario);
  }
  public actualizar_usuario(usuario:Usuario):Observable<void>{
    return this.http.put<void>(this.urlConexionBase+"/usuario/usuario.php",usuario);
  }

  public alternarEstadoActivacionDeUsuario(id_usuario:number){
    return this.http.delete(this.urlConexionBase+"/usuario/usuario.php?id_usuario="+id_usuario);
  }
  
  public changePassword(id_usuario_objetivo:number, nueva_contrasena:string, contrasena_del_solicitante:string):Observable<void>{
    return this.http.post<void>(this.urlConexionBase+`/usuario/cambiar_contrasena.php`,{id_usuario_objetivo, nueva_contrasena, contrasena_del_solicitante});
  }

  public obtenerDatosDelUsuarioPorId(id_usuario:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.urlConexionBase+"/usuario/usuario.php?id_usuario="+id_usuario);
  }

  public obtenerDatosDelUsuarioPorToken():Observable<Usuario>{
    return this.http.post<Usuario>(this.urlConexionBase+"/usuario/obtener_usuario_desde_token.php",{});
  }
}