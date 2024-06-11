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

export const PATHS = {
  inicio : "",
  login : "login",
  servicios : "servicios",
  acercaDe : "acerca-de",
  panelAdministrador: "bienvenido",
  panelAgente : "agente",
  panelMantenimiento : "mantenimiento",  
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
      { path: 'ListaDePaises', component: ListaPaisComponent}
    ],
    canActivate:[estaLogueadoGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
