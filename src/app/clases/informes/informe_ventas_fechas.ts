import { Categoria } from "../base_de_datos/comercial/categoria";
import { Producto } from "../base_de_datos/comercial/producto"

export interface InformeProductosVentasFechas {
    producto:Producto;
    DIAS_TOTALES:string;
    //Totales
    CANTIDAD_VENDIDA:string;
    GANANCIA_GENERADA:string
    TOTAL_VENDIDO:string
    TOTAL_COSTE:string;
    //Promedios
    CANT_PROM_DIARIO:string;
    GANANCIA_PROM_DIARIO:string;
    VENDIDO_PROM_DIARIO:string;
    COSTE_PROM_DIARIO:string;  
}

export interface InformeCategoriaVentasFechas {
    categoria:Categoria|null;
    DIAS_TOTALES:string;
    //Totales
    CANTIDAD_VENDIDA:string;
    GANANCIA_GENERADA:string
    TOTAL_VENDIDO:string
    TOTAL_COSTE:string;
    //Promedios
    CANT_PROM_DIARIO:string;
    GANANCIA_PROM_DIARIO:string;
    VENDIDO_PROM_DIARIO:string;
    COSTE_PROM_DIARIO:string;    
}