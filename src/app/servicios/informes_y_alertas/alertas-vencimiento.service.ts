import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { RespuestaDeError } from 'src/app/clases/utiles/RespuestaDeError';
import { StockLote } from 'src/app/clases/base_de_datos/comercial/stock';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertasVencimientoService extends DatosDeConexion{

  private silenciar_alarmas:boolean = false;
  private faltaban_la_ultima_vez_consultada:boolean = false;
  public cantidad_la_ultima_vez_consultada:number = 0;
  private habia_ocurrido_un_error = false;

  constructor() {
    super();
  }

  public obtener_lista_stock_proximos_a_vencer(tiempo_antelacion=14):Observable<StockLote[]>{
    const params = new HttpParams().set('dias_de_anticipacion',tiempo_antelacion);
    return this.http.get<StockLote[]>(this.urlConexionBase+"/informes/vencimiento_proximo.php", {params});
  }

  public consultar_si_se_acercan_vencimientos():void{
    //Si hubo un error, no lo consultamos más
    if (this.habia_ocurrido_un_error) return;
    this.obtener_lista_stock_proximos_a_vencer().subscribe({
      next: (res) => {
        this.faltaban_la_ultima_vez_consultada = (res.length>0);
        this.cantidad_la_ultima_vez_consultada = res.length;
      },
      error: (error) => {
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({title:'Ocurrio un errror', icon:'error', text:'Servidor Responde: '+mensajeDeError.error_msg, confirmButtonText:'Entendido'});
        this.habia_ocurrido_un_error=true;
      }
    })
  }

  public silenciar():void{
    this.silenciar_alarmas = true;
  }
  
  get hay_productos_por_vencerse():boolean{
    if(this.silenciar_alarmas || this.habia_ocurrido_un_error) return false;
    return this.faltaban_la_ultima_vez_consultada;
  }
}