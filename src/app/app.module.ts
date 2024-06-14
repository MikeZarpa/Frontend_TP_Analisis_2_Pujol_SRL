import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { PaginaLoginComponent } from './paginas/pagina-login/pagina-login.component';
import { PaginaBienvenidaComponent } from './paginas/pagina-bienvenida/pagina-bienvenida.component';
import { Interceptor } from './servicios/Interceptor/interceptor';
import { NavbarInicialComponent } from './componentes/navbars/navbar-inicial/navbar-inicial.component';
import { NavbarBienvenidaComponent } from './componentes/navbars/navbar-bienvenida/navbar-bienvenida.component';
import { NavbarOpcionesAdminComponent } from './componentes/navbars/navbar-opciones-admin/navbar-opciones-admin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
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
import { EmisionVentaComponent } from './paginas/ventas/emisor_venta/emision-venta/emision-venta.component';
import { EditProductoComponent } from './paginas/ventas/productos/lista-productos/edit-producto/edit-producto.component';

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
    EditProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass:Interceptor, multi:true} //Registramos el interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
