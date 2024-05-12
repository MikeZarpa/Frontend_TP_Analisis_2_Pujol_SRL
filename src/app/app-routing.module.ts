import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaLoginComponent } from './paginas/pagina-login/pagina-login.component';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { PaginaBienvenidaComponent } from './paginas/pagina-bienvenida/pagina-bienvenida.component';
import { loginGuard } from './guards/login.guard';
import { estaLogueadoGuard } from './guards/esta-logueado.guard';

const routes: Routes = [
  {path:'', component:PaginaInicialComponent, canActivate:[]},
  {path:'login', component:PaginaLoginComponent, canActivate:[loginGuard]},
  {path:'bienvenido', component:PaginaBienvenidaComponent, canActivate:[estaLogueadoGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
