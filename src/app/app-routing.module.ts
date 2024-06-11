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
import { Producto } from './clases/base_de_datos/comercial/producto';
import { EmisionVentaComponent } from './paginas/ventas/emisor_venta/emision-venta/emision-venta.component';

export const PATHS = {
  inicio : "",
  login : "login",
  servicios : "servicios",
  acercaDe : "acerca-de",
  panelAdministrador: "bienvenido",
  panelAgente : "agente",
  panelMantenimiento : "mantenimiento",  
  ventas:"ventas",
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
      { path: 'ListaDeLocalidades', component: ListaLocalidadComponent},
      { path: 'ListaDeProvincias', component: ListaProvinciaComponent},
      { path: 'ListaDePaises', component: ListaProductosComponent}
    ],
    canActivate:[estaLogueadoGuard]},
    {path:PATHS.ventas, component:PaginaBienvenidaComponent,
      children:[
        { path: 'Productos', component: ListaProductosComponent},
        { path: 'EmisionVenta', component: EmisionVentaComponent},
      ],
      canActivate:[estaLogueadoGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
