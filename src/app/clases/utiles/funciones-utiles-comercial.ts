import { CondicionIva } from "../base_de_datos/entidades/cond_iva";

export class FuncionesUtilesComerciales{
    public static obtener_descuento_de_iva(monto_total:number, condicion_iva:CondicionIva){
        const porcentaje = 121 - condicion_iva.porcentaje;
        const descuento = monto_total - monto_total*porcentaje/100;
        return parseFloat(descuento.toFixed(2));
    }

    public static obtener_monto_iva_descontado(monto_total:number, condicion_iva:CondicionIva){
        const porcentaje = 121 - condicion_iva.porcentaje;
        const descuento = monto_total*porcentaje/100;
        return parseFloat(descuento.toFixed(2));
    }
}