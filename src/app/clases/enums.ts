export enum EstadoDelFormulario{
    Base,
    Editando,
    Nuevo,
    ViendoDatosAdjuntos,   
}



export enum ModificadoresParaLaBusquedaDeSocios{
    NINGUNO, NO_SUSCRITOS_A_DEBITO
}

export enum TipoDeComparacion{
    CONTIENE='1',
    LITERAL='2',
    DESDE='3',
    HASTA='4',
    DESDE_Y_HASTA='5',
    POR_ID_CAMPO='6', //refiere a que dado un "campo", ejemplo, "categoriaSocio", se analiza la id, en plan socio.categoria_socio.id == $terminoBusqueda[0]
}
export enum CriterioFiltroSocio{
    DNI='1', Nombre='2',Apellido='3',FechaDeAlta='4',EstadoDeCuenta='5',Usuario='6'
    
}

export enum CriterioFiltroTipoDeCambio{
    CREADO='1',MODIFICADO='2',BORRADO='3',DE_BAJA='4',REACTIVADO='5',INICIADO_SESION='6',CAMBIO_DE_CONTRASEÑA='7',
}
export enum EnumClasesRegistroDeActividad{

    /*"id"	"nombre"
    "1"	"socio"
"2"	"info_cobro"
"3"	"historial_precio"
"4"	"cuota"
"5"	"liquidacion"
"6"	"usuario"
"7"	"ninguno"
"8"	"cuota[]"
*/
    socio="1",info_cobro="2"
}
export enum PreviewTipoDeArchivo{
    IMAGEN, PDF
}