import { CarritoItem } from "src/app/paginas/ventas/emisor_venta/emision-venta/emision-venta.component";
import { Usuario } from "../Usuario";
import { CondicionIva } from "../entidades/cond_iva";
import { Cliente } from "../entidades/cliente";
import { MetodoPago } from "./metodo_pago";
import { DetalleFactura } from "./detalle_factura";

export class Factura{
    id_factura_venta:number|null = null;
    fecha!:Date;
    total:number|null = null;
    items:CarritoItem[] = [];
    //Metodo pago
    metodo_pago!:MetodoPago|null;
    //id_condicion_iva
    cond_iva!:CondicionIva;
    //id_cliente
    cliente:Cliente|null = null;
    //id_usuario
    usuario:Usuario|null = null;
    habilitado:boolean=true;
    detalles_venta:DetalleFactura[] = [];
}