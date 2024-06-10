import { Provincia } from "./Provincia";

export class Localidad{
    id_localidad:number|null=null;
    descripcion:string="";
    codigo_postal:string="";
    id_provincia!:number;
    provincia:Provincia|null = null;
}