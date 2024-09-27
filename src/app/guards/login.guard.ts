import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../servicios/sesion/sesion.service';


export const loginGuard: CanActivateFn = (route, state) => {
  const servicioDeSesion = inject(SesionService);
  const router = inject(Router)

  //El usuario solo puede entrar al login si es que no está cargado...
  if(servicioDeSesion.elUsuarioEstaCargado){
    //Lo redirigimos
    return router.navigateByUrl("/bienvenido");
  }
  return true;
};
