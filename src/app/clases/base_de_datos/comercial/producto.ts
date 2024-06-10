import { Categoria } from "./categoria";
import { Marca } from "./marca";

export class Producto{
    id_producto:null|number =null;
    descripcion:string = "";
    cantidad_minima:number|null = null;
    cantidad:number|null= null;
    id_marca:number|null = null;
    habilitado:boolean=true;
    marca:Marca|null = null;
    categorias:Categoria[]|null=null;
}