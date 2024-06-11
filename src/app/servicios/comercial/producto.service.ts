import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends DatosDeConexion{

  constructor() {
    super();
   }
    public obtenerTodosConPagina(datosPagina:DatosNavegacionPorPagina = {nroPagina:1,pageSize:10}):Observable<RespuestaPageable<Producto>>{
  
      //const filtroJSON = JSON.stringify(filtro);    
  
      let params = new HttpParams()
      .set('nroPagina', datosPagina.nroPagina.toString())
      .set('pageSize', datosPagina.pageSize.toString());
      //.set('filtro',filtroJSON);    
  
      return this.http.get<RespuestaPageable<Producto>>(this.urlConexionBase+"/producto",{ params: params });
     }
    public borrar(id:number):Observable<void>{
      return this.http.delete<void>(this.urlConexionBase+"/producto?id_producto="+id);
    }
  
    /*
    public obtenerPorId(id:number):Observable<InfoCobro>{
      return this.http.get<InfoCobro>(this.urlConexionBase+"/infoCobro/"+id);
     }*/
    //  public obtenerPorSocioId(id:number):Observable<InfoCobro>{
    //   return this.http.get<InfoCobro>(this.urlConexionBase+"/infoCobro/socio/"+id);
    //  }
    // public salvar(infoCobro:InfoCobro):Observable<InfoCobro>{
    //   return this.http.post<InfoCobro>(this.urlConexionBase+"/infoCobro",infoCobro);
    // }
}
