export class TipoDetalleVenta{
    id_tipo_det_venta:number|null = null;
    descripcion!:string;
    codigo!:string;
}
/*
Códigos...

VENTA
PROM
*/
export enum EnumCodigoDetalleVenta{
    VENTA = "VENTA",
    PROMOCION = "PROM"
}