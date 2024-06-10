import { Pais } from "./Pais";

export class Provincia{
    id_provincia:number|null=null;
    descripcion:string="";
    id_pais!:number;
    pais:null|Pais=null;
}