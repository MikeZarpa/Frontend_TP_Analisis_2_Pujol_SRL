export enum EstadoDelFormulario{
    Base,
    Editando,
    Nuevo,
    Busqueda,
    ViendoDatosAdjuntos,   
}
export enum TipoDeComparacion{
    CONTIENE='1',
    LITERAL='2',
    DESDE='3',
    HASTA='4',
    DESDE_Y_HASTA='5',
    POR_ID_CAMPO='6',
    POR_NULIDAD='7',
    MAYOR_QUE='8'
}
export enum EnumFiltroProductos{
    Producto,
    Habilitado,
    Marca
}
export enum EnumFiltroFactura{
    id_cliente,
    fecha,
    id_usuario
}
export enum EnumFiltroMarcas{
    descripcion,
    habilitado
}

export enum EnumFiltroCliente{
    nombre,
    apellido,
    dni,
    habilitado
}
export enum EnumFiltroStock{
    habilitado,
    fecha_vencimiento,
    cantidad
}
export enum EnumFiltroCategoriaProducto{
    descripcion
}

export enum RolesDelSistema{
    Administrador="ADMIN",
    Cajero="CAJERO",
}