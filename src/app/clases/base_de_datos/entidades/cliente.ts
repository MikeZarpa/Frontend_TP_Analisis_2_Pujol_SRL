import { Pais } from "../ubicacion/Pais";
import { CondicionIva } from "./cond_iva";
import { Direccion } from "./direccion";

export class Cliente{
    id_cliente:null|number=null;
    nombre:string = "";
    apellido:string = "";
    dni:string = "";
    cuil_cuit:string = "";
    id_cond_iva:number|null = null;
    id_direccion!:number;
    id_pais:number|null= null;

    pais:Pais|null = null;
    direccion:Direccion|null = null;
    cond_iva:CondicionIva|null = null;
}