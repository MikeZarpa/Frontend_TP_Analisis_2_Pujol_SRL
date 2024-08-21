export class EmisionFacturaDTO{
    carrito:ItemEmisionFacturaDTO[] = []
    id_cliente:number|null = null;
    descuento:number|null = null;
}

export class ItemEmisionFacturaDTO{
    id_histprecio:number|null = null;
    id_promocion:number|null = null;
    cantidad!:number;
    id_tipo_det_venta:number = 1;
}