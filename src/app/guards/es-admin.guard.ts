import { CanActivateChildFn } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';
import { inject } from '@angular/core';
import { RolesDelSistema } from '../clases/enums';

export const esAdminGuard: CanActivateChildFn = (childRoute, state) => {
  const servicioDeSesion = inject(SesionService);
  return servicioDeSesion.poseeElRol(RolesDelSistema.Administrador);
};
