import { ListaStockFaltanteComponent } from './paginas/informes_y_alertas/lista-stock-faltante/lista-stock-faltante.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaLoginComponent } from './paginas/pagina-login/pagina-login.component';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { PaginaBienvenidaComponent } from './paginas/pagina-bienvenida/pagina-bienvenida.component';
import { loginGuard } from './guards/login.guard';
import { estaLogueadoGuard } from './guards/esta-logueado.guard';
import { ListaLocalidadComponent } from './paginas/mantenimiento/Localidad/lista-localidad/lista-localidad.component';
import { ListaProvinciaComponent } from './paginas/mantenimiento/Provincia/lista-provincia/lista-provincia.component';
import { ListaPaisComponent } from './paginas/mantenimiento/Pais/lista-pais/lista-pais.component';
import { PaginaHomeComponent } from './paginas/pagina-bienvenida/pagina-home/pagina-home.component';
import { ListaProductosComponent } from './paginas/ventas/productos/lista-productos/lista-productos.component';
import { EmisionVentaComponent } from './paginas/ventas/emision-venta/emision-venta.component';
import { ListaClientesComponent } from './paginas/ventas/clientes/lista-clientes/lista-clientes.component';
import { ListaUsuarioComponent } from './paginas/mantenimiento/Usuarios/lista-usuario/lista-usuario.component';
import { ListaMarcasComponent } from './paginas/ventas/marcas/lista-marcas/lista-marcas.component';
import { ListaFacturasComponent } from './paginas/ventas/facturas/lista-facturas/lista-facturas.component';
import { ListaStockComponent } from './paginas/ventas/stock/lista-stock/lista-stock.component';
import { InformeVentasComponent } from './paginas/informes_y_alertas/informe-ventas/informe-ventas.component';
import { ListaStockPorVencerComponent } from './paginas/informes_y_alertas/lista-stock-por-vencer/lista-stock-por-vencer.component';
import { esAdminGuard } from './guards/es-admin.guard';
import { CargadorDeStockPorCantidadComponent } from './paginas/ventas/stock/cargador-de-stock-por-cantidad/cargador-de-stock-por-cantidad.component';
import { ListaCategoriaProductoComponent } from './paginas/ventas/categoria_producto/lista-categoria-producto/lista-categoria-producto.component';

export const PATHS = {
  inicio : "",
  login : "login",
  servicios : "servicios",
  acercaDe : "acerca-de",
  panelAdministrador: "bienvenido",
  panelAgente : "agente",
  panelMantenimiento : "mantenimiento",  
  ventas:"ventas",
  clientes:"clientes",
  usuarios:"usuarios",
  informes:"informes",
};

const routes: Routes = [
  {path:'', component:PaginaInicialComponent, canActivate:[]},
  {path:'login', component:PaginaLoginComponent, canActivate:[loginGuard]},
  {path:'bienvenido', component:PaginaBienvenidaComponent,
    children:[
      { path: '', component: PaginaHomeComponent}
    ],
    canActivate:[estaLogueadoGuard]},
  {path:'mantenimiento', component:PaginaBienvenidaComponent,
    children:[
      { path: 'ListaDeLocalidades', component: ListaLocalidadComponent, canActivate:[esAdminGuard]},
      { path: 'ListaDeProvincias', component: ListaProvinciaComponent, canActivate:[esAdminGuard]},
      { path: 'ListaDePaises', component: ListaPaisComponent, canActivate:[esAdminGuard]}
    ],
    canActivate:[estaLogueadoGuard]},
    {path:PATHS.ventas, component:PaginaBienvenidaComponent,
      children:[
        { path: 'Productos', component: ListaProductosComponent , canActivate:[esAdminGuard]},
        { path: 'EmisionVenta', component: EmisionVentaComponent},
        { path: 'Marcas', component: ListaMarcasComponent, canActivate:[esAdminGuard]},
        { path: 'CategoriaProducto', component: ListaCategoriaProductoComponent, canActivate:[esAdminGuard]},
        { path: 'Facturas', component: ListaFacturasComponent, canActivate:[esAdminGuard]},
        { path: 'Stock', component: ListaStockComponent, canActivate:[esAdminGuard]},
        { path: 'CargaDeStock', component: CargadorDeStockPorCantidadComponent, canActivate:[esAdminGuard]},
      ],
      canActivate:[estaLogueadoGuard]},
    {path:PATHS.clientes, component:PaginaBienvenidaComponent,
      children:[
        { path: '', component: ListaClientesComponent , canActivate:[esAdminGuard]}
      ],
      canActivate:[estaLogueadoGuard],
    },
    {path:PATHS.usuarios, component:PaginaBienvenidaComponent,
      children:[
        {path: '', component:ListaUsuarioComponent}
    ], canActivate:[estaLogueadoGuard, esAdminGuard]},
    {path:PATHS.informes, component:PaginaBienvenidaComponent,
      children:[
        {path: 'ventas', component:InformeVentasComponent},
        {path: 'aviso_de_stock', component:ListaStockFaltanteComponent},
        {path: 'aviso_de_vencimiento', component:ListaStockPorVencerComponent}
    ], canActivate:[estaLogueadoGuard, esAdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
