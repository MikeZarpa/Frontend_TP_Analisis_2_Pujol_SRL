import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import { RespuestaDeError } from 'src/app/clases/dtos/RespuestaDeError';
import { HttpParams } from '@angular/common/http';
import { InformeCategoriaVentasFechas, InformeProductosVentasFechas } from 'src/app/clases/informes/informe_ventas_fechas';

@Injectable({
  providedIn: 'root'
})
export class InformesService extends DatosDeConexion{

  constructor() {
    super();
  }

  public venta_producto_entre_fechas($fecha1:string, $fecha2:string):Observable<InformeProductosVentasFechas[]>{
    const params = new HttpParams()
      .set("fecha1",$fecha1)
      .set("fecha2",$fecha2);
    return this.http.get<InformeProductosVentasFechas[]>(this.urlConexionBase+"/informes/ventas_productos_entre_fechas.php",{params});
  }
  public venta_categoria_entre_fechas($fecha1:string, $fecha2:string):Observable<InformeCategoriaVentasFechas[]>{
    const params = new HttpParams()
      .set("fecha1",$fecha1)
      .set("fecha2",$fecha2);
    return this.http.get<InformeCategoriaVentasFechas[]>(this.urlConexionBase+"/informes/ventas_categoria_entre_fechas.php",{params});
  }
}