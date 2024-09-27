import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { PaginaLoginComponent } from './paginas/pagina-login/pagina-login.component';
import { PaginaBienvenidaComponent } from './paginas/pagina-bienvenida/pagina-bienvenida.component';
import { Interceptor } from './servicios/sesion/Interceptor/interceptor';
import { NavbarInicialComponent } from './componentes/navbars/navbar-inicial/navbar-inicial.component';
import { NavbarBienvenidaComponent } from './componentes/navbars/navbar-bienvenida/navbar-bienvenida.component';
import { NavbarOpcionesAdminComponent } from './componentes/navbars/navbar-opciones-admin/navbar-opciones-admin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { ListaPaisComponent } from './paginas/mantenimiento/Pais/lista-pais/lista-pais.component';
import { EditPaisComponent } from './paginas/mantenimiento/Pais/edit-pais/edit-pais.component';
import { ListaProvinciaComponent } from './paginas/mantenimiento/Provincia/lista-provincia/lista-provincia.component';
import { EditProvinciaComponent } from './paginas/mantenimiento/Provincia/edit-provincia/edit-provincia.component';
import { ListaLocalidadComponent } from './paginas/mantenimiento/Localidad/lista-localidad/lista-localidad.component';
import { EditLocalidadComponent } from './paginas/mantenimiento/Localidad/edit-localidad/edit-localidad.component';
import { BtnVolverComponent } from './componentes/interfaz/btn-volver/btn-volver.component';
import { PaginaHomeComponent } from './paginas/pagina-bienvenida/pagina-home/pagina-home.component';
import { ListaProductosComponent } from './paginas/ventas/productos/lista-productos/lista-productos.component';
import { BarraPaginacionComponent } from './componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { EmisionVentaComponent } from './paginas/ventas/emision-venta/emision-venta.component';
import { EditProductoComponent } from './paginas/ventas/productos/lista-productos/edit-producto/edit-producto.component';
import { ListaClientesComponent } from './paginas/ventas/clientes/lista-clientes/lista-clientes.component';
import { EditClienteComponent } from './paginas/ventas/clientes/lista-clientes/edit-cliente/edit-cliente.component';
import { DialogBusquedaClienteComponent } from './paginas/ventas/clientes/dialog-busqueda-cliente/dialog-busqueda-cliente.component';
import { ListaMarcasComponent } from './paginas/ventas/marcas/lista-marcas/lista-marcas.component';
import { EditMarcaComponent } from './paginas/ventas/marcas/lista-marcas/edit-marca/edit-marca.component';
import { DialogBusquedaMarcaComponent } from './paginas/ventas/marcas/dialog-busqueda-marca/dialog-busqueda-marca.component';
import { EditUsuarioComponent } from './paginas/mantenimiento/Usuarios/edit-usuario/edit-usuario.component';
import { ListaUsuarioComponent } from './paginas/mantenimiento/Usuarios/lista-usuario/lista-usuario.component';
import { PopupSeleccionRolComponent } from './paginas/mantenimiento/Usuarios/popup-seleccion-rol/popup-seleccion-rol.component';
import { ListaFacturasComponent } from './paginas/ventas/facturas/lista-facturas/lista-facturas.component';
import { VisualizadorFacturaComponent } from './paginas/ventas/facturas/lista-facturas/visualizador-factura/visualizador-factura.component';
import { BarraFiltroFechaComponent } from './componentes/barra_de_busqueda/barra-filtro-fecha/barra-filtro-fecha.component';
import { BarraFiltroUsuarioComponent } from './componentes/barra_de_busqueda/barra-filtro-usuario/barra-filtro-usuario.component';
import { BarraBusquedaTextoComponent } from './componentes/barra_de_busqueda/barra-busqueda-texto/barra-busqueda-texto.component';
import { BarraFiltroDesplegableComponent } from './componentes/barra_de_busqueda/barra-filtro-desplegable/barra-filtro-desplegable.component';
import { ListaStockComponent } from './paginas/ventas/stock/lista-stock/lista-stock.component';
import { DialogBusquedaProductoComponent } from './paginas/ventas/productos/dialog-busqueda-producto/dialog-busqueda-producto.component';
import { EditStockComponent } from './paginas/ventas/stock/lista-stock/edit-stock/edit-stock.component';
import { ListaStockFaltanteComponent } from './paginas/informes_y_alertas/lista-stock-faltante/lista-stock-faltante.component';
import { InformeVentasComponent } from './paginas/informes_y_alertas/informe-ventas/informe-ventas.component';
import { ListaStockPorVencerComponent } from './paginas/informes_y_alertas/lista-stock-por-vencer/lista-stock-por-vencer.component';
import { SoloAdminDirective } from './directivas_de_visibilidad/solo-admin.directive';
import { CargadorDeStockPorCantidadComponent } from './paginas/ventas/stock/cargador-de-stock-por-cantidad/cargador-de-stock-por-cantidad.component';
import { ListaCategoriaProductoComponent } from './paginas/ventas/categoria_producto/lista-categoria-producto/lista-categoria-producto.component';
import { EditCategoriaProductoComponent } from './paginas/ventas/categoria_producto/lista-categoria-producto/edit-categoria-producto/edit-categoria-producto.component';
import { DialogBusquedaCategoriaProductoComponent } from './paginas/ventas/categoria_producto/dialog-busqueda-categoria-producto/dialog-busqueda-categoria-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    PaginaLoginComponent,
    PaginaBienvenidaComponent,
    NavbarInicialComponent,
    NavbarBienvenidaComponent,
    NavbarOpcionesAdminComponent,
    //EditarPaises
    ListaPaisComponent,
    EditPaisComponent,
    //EditarProvincia
    ListaProvinciaComponent,
    EditProvinciaComponent,
    //EditarLocalidad
    ListaLocalidadComponent,
    EditLocalidadComponent,
    //Interfaz, boton volver
    BtnVolverComponent,
    BarraPaginacionComponent,
    PaginaHomeComponent,
    ListaProductosComponent,
    EmisionVentaComponent,
    EditProductoComponent,
    ListaClientesComponent,
    EditClienteComponent,
    DialogBusquedaClienteComponent,
    ListaMarcasComponent,
    EditMarcaComponent,
    DialogBusquedaMarcaComponent,
    EditUsuarioComponent,
    ListaUsuarioComponent,
    PopupSeleccionRolComponent,
    ListaFacturasComponent,
    VisualizadorFacturaComponent,
    BarraFiltroFechaComponent,
    BarraFiltroUsuarioComponent,
    BarraBusquedaTextoComponent,
    BarraFiltroDesplegableComponent,
    ListaStockComponent,
    DialogBusquedaProductoComponent,
    EditStockComponent,
    ListaStockFaltanteComponent,
    InformeVentasComponent,
    ListaStockPorVencerComponent,
    SoloAdminDirective,
    CargadorDeStockPorCantidadComponent,
    ListaCategoriaProductoComponent,
    EditCategoriaProductoComponent,
    DialogBusquedaCategoriaProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass:Interceptor, multi:true} //Registramos el interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
