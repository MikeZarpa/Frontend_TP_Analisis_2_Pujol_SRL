import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import Swal from 'sweetalert2';
import { RespuestaDeError } from 'src/app/clases/utiles/RespuestaDeError';

@Injectable({
  providedIn: 'root'
})
export class AlertasStockService extends DatosDeConexion{

  private silenciar_alarmas:boolean = false;
  private faltaban_la_ultima_vez_consultada:boolean = false;
  public cantidad_que_faltaban_la_ultima_vez_consultada:number = 0;
  private habia_ocurrido_un_error = false;

  constructor() {
    super();
  }

  public obtener_lista_productos_bajo_stock():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlConexionBase+"/informes/bajo_stock.php");
  }

  public consultar_si_faltan_productos():void{
    //Si hubo un error, no lo consultamos más
    if (this.habia_ocurrido_un_error) return;
    this.obtener_lista_productos_bajo_stock().subscribe({
      next: (res) => {
        this.faltaban_la_ultima_vez_consultada = (res.length>0);
        this.cantidad_que_faltaban_la_ultima_vez_consultada = res.length;
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
  
  get hay_productos_bajo_stock():boolean{
    if(this.silenciar_alarmas || this.habia_ocurrido_un_error) return false;
    return this.faltaban_la_ultima_vez_consultada;
  }
}