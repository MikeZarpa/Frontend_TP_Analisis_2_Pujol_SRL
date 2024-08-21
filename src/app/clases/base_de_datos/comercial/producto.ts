import { Categoria } from "./categoria";
import { HistorialPrecio } from "./historia_precio";
import { Marca } from "./marca";
import { StockLote } from "./stock";

export class Producto{
    id_producto:null|number =null;
    descripcion:string = "";
    cantidad_minima:number|null = null;
    total_cantidad:number|null= null;
    id_marca:number|null = null;
    habilitado:number=1;
    marca:Marca|null = null;
    historial_precio:HistorialPrecio|null = null;
    id_categoria:null|number = null;
    categoria:Categoria|null = null;
    ultimo_stock:StockLote|null = null;
}