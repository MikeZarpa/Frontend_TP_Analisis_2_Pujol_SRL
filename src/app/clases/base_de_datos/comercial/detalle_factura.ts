import { HistorialPrecio } from "./historia_precio";
import { TipoDetalleVenta } from "./tipo_detalle_venta";

export class DetalleFactura{
    id_det_venta:number|null = null;
    cantidad!:number;
    hist_precio!:HistorialPrecio;
    // promocion:Promocion|null = null;
    tipo_detalle_venta:TipoDetalleVenta|null = null;
}