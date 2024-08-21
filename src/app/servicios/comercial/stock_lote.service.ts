import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { HttpParams } from '@angular/common/http';
import { Filtro } from 'src/app/clases/utiles/filtro';
import { StockLote } from 'src/app/clases/base_de_datos/comercial/stock';

@Injectable({
  providedIn: 'root'
})
export class StockLoteService extends DatosDeConexion{

  constructor() {
    super();
  }

  public obtenerTodosPorIdProductoConPagina(id_producto:number,filtro:Filtro<any>,datosPagina:DatosNavegacionPorPagina = {nroPagina:1,pageSize:10}):Observable<RespuestaPageable<StockLote>>{  
    const filtroJSON = JSON.stringify(filtro);      
    let params = new HttpParams()
    .set('id_producto', id_producto)
    .set('nroPagina', datosPagina.nroPagina.toString())
    .set('pageSize', datosPagina.pageSize.toString())
    .set('filtro',filtroJSON);      
    return this.http.get<RespuestaPageable<StockLote>>(this.urlConexionBase+"/stock_lote.php",{ params: params });
  }

  public crear_stock_lote(lote:StockLote):Observable<void>{
    return this.http.post<void>(this.urlConexionBase+"/stock_lote.php",lote);
  }
  public cargar_stock_lote_en_masa(stocks:StockLote[]):Observable<void>{
    return this.http.post<void>(this.urlConexionBase+"/stock_lote_multiple.php",{stocks});
  }
  public actualiza_stock_lote(lote:StockLote):Observable<void>{
    return this.http.put<void>(this.urlConexionBase+"/stock_lote.php",lote);
  }
  public borrar_o_vaciar_stock_lote(id_stock:number):Observable<void>{
    return this.http.delete<void>(this.urlConexionBase+"/stock_lote.php",{body:{id_stock}});
  }
}