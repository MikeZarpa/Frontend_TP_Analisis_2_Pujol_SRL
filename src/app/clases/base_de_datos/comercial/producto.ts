import { Categoria } from "./categoria";
import { HistorialPrecio } from "./historia_precio";
import { Marca } from "./marca";

export class Producto{
    id_producto:null|number =null;
    descripcion:string = "";
    cantidad_minima:number|null = null;
    total_cantidad:number|null= null;
    id_marca:number|null = null;
    habilitado:number=1;
    marca:Marca|null = null;
    categorias:Categoria[]|null=null;
    historial_precio:HistorialPrecio|null = null;
}