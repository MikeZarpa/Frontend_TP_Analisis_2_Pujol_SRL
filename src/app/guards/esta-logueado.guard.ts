import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';

export const estaLogueadoGuard: CanActivateFn = (route, state) => {
  const servicioDeSesion = inject(SesionService);
  const router = inject(Router)
  
  if(!servicioDeSesion.elUsuarioEstaCargado){
    return router.navigateByUrl('/login');
  }
  return true;
};
