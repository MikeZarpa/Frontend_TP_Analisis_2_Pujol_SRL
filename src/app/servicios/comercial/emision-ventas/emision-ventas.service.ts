import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmisionFacturaDTO } from 'src/app/clases/dtos/emision_factura_dto';
import { DatosDeConexion } from '../../datos-de-conexion';

@Injectable({
  providedIn: 'root'
})
export class EmisionVentasService extends DatosDeConexion{
  constructor() {
    super();
  }

  public EmitirVenta(factura : EmisionFacturaDTO):Observable<void>{
    const bodyRequest = {
      factura: factura,
    }

    return this.http.post<void>(this.urlConexionBase+"/ventas/procesar_venta.php",bodyRequest);
  }
}
