import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const servicioDeSesion = inject(SesionService);
  const router = inject(Router)

  if(servicioDeSesion.elUsuarioEstaCargado){
    return router.navigateByUrl("/bienvenido");
  }
  return true;
};
