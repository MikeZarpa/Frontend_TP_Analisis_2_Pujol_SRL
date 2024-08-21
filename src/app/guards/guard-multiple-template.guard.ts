import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { esAdminGuard } from './es-admin.guard';
import { estaLogueadoGuard } from './esta-logueado.guard';
import { catchError, forkJoin, map, of } from 'rxjs';

export const guardMultipleTemplateGuard: CanActivateChildFn = (childRoute, state) => {
  // Aquí defines el array de guards que quieres verificar
  const guardsToCheck = [
    inject(esAdminGuard),
    inject(estaLogueadoGuard),
    // Añade otros guards aquí
  ];

  // Convertimos cada guard en un Observable<boolean>
  const guardObservables = guardsToCheck.map(guard => 
    guard.canActivate(childRoute, state).pipe(
      catchError(() => of(false)) // En caso de error, tratamos como falso
    )
  );

  // Usamos forkJoin para ejecutar todos los guards en paralelo
  return forkJoin(guardObservables).pipe(
    map(results => results.some(result => result)) // Verifica si al menos uno es true
  );
};

