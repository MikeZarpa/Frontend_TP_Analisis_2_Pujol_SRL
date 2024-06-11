import { StockLote } from "./stock";

export class HistorialPrecio{
    id_histprecio:number|null = null;
    precio!:number;
    fecha_vigencia!:Date;
    id_stock!:number;
    stock:StockLote|null = null;
}
