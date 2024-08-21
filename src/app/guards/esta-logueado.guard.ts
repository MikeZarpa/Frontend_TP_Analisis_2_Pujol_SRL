import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';
import { TokenService } from '../servicios/token.service';
import { RolesDelSistema } from '../clases/enums';
import Swal from 'sweetalert2';

export const estaLogueadoGuard: CanActivateFn = (route, state) => {
  const servicioDeSesion = inject(SesionService);
  const servicioDeToken = inject(TokenService);

  const router = inject(Router)
  
  if(!servicioDeSesion.elUsuarioEstaCargado){
    if(servicioDeToken.esta_logueado())
      return router.navigateByUrl('/');
    return router.navigateByUrl('/login');
  }
  // Si no tiene roles, solo puede ir a bienvenido
  if(!servicioDeSesion.tieneAlgunRol() && state.url !== '/bienvenido'){
    Swal.fire({
      icon:'warning',
      title:'Aviso',
      text:'El usuario no posee ningún rol, no puede navegar por opciones.',
      confirmButtonText:'Entendido',
    });
    router.navigateByUrl('/bienvenido');
  }

  return true;
};
