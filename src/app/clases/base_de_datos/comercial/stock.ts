import { Producto } from "./producto";

export class StockLote{
    id_stock:number|null = null;
    id_producto!:number;
    cantidad!:number;
    coste!:number;
    fecha_vto:Date|null=null;
    producto:Producto|null=null;
}