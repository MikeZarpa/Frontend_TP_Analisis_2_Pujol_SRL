import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { HttpParams } from '@angular/common/http';
import { Filtro, FiltroDetalle } from 'src/app/clases/dtos/filtro';
import { EnumFiltroProductos, TipoDeComparacion } from 'src/app/clases/enums';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends DatosDeConexion{

  constructor() {
    super();
   }
    public obtenerTodosConPagina(filtro:Filtro<any>,datosPagina:DatosNavegacionPorPagina = {nroPagina:1,pageSize:10}):Observable<RespuestaPageable<Producto>>{  
      const filtroJSON = JSON.stringify(filtro);   
         
      let params = new HttpParams()
      .set('nroPagina', datosPagina.nroPagina.toString())
      .set('pageSize', datosPagina.pageSize.toString())
      .set('filtro',filtroJSON);   

      return this.http.get<RespuestaPageable<Producto>>(this.urlConexionBase+"/producto.php",{ params: params });
     }

    public borrar(id:number):Observable<void>{
      return this.http.delete<void>(this.urlConexionBase+"/producto.php?id_producto="+id);
    }
  
    public actualizar_precio(id_producto:number,precio:number){
      let body = {id_producto, precio};
      return this.http.post<void>(this.urlConexionBase+"/producto_precio/historial_precio.php",body);
    }
    
    public obtenerTodosSinPagina():Observable<Producto[]>{

      const filtro = new Filtro<EnumFiltroProductos>();
      filtro.setCantidadFilters(1);
      const filtro_detalle1 = new FiltroDetalle<EnumFiltroProductos>();
      filtro_detalle1.enabled = true;
      filtro_detalle1.campo = EnumFiltroProductos.Habilitado;
      filtro_detalle1.terminosDeBusqueda = ['1'];
      filtro_detalle1.tipoBusqueda = TipoDeComparacion.LITERAL;

      filtro.filters[0] = (filtro_detalle1);
      filtro.comprobar(); console.log(filtro);

      const filtroJSON = JSON.stringify(filtro);      
      let params = new HttpParams()
      .set('no_paginar',true)
      .set('filtro',filtroJSON);      

      return this.http.get<Producto[]>(this.urlConexionBase+"/producto.php", {params:params});
    }

    public crear_producto(producto:Producto):Observable<void>{
      return this.http.post<void>(this.urlConexionBase+"/producto.php",producto);
    }
    public actualizar_producto(producto:Producto):Observable<void>{
      return this.http.put<void>(this.urlConexionBase+"/producto.php",producto);
    }
}