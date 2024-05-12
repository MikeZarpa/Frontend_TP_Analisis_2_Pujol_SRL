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

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    PaginaLoginComponent,
    PaginaBienvenidaComponent,
    NavbarInicialComponent,
    NavbarBienvenidaComponent,
    NavbarOpcionesAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass:Interceptor, multi:true} //Registramos el interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
