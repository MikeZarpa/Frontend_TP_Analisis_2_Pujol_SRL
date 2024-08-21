import { SesionService } from 'src/app/servicios/sesion.service';
import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { RolesDelSistema } from 'src/app/clases/enums';

@Directive({
  selector: '[appSoloAdmin]'
})
export class SoloAdminDirective {

  SesionService = inject(SesionService);
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.checkAccess();
  }

  private checkAccess() {
    if (this.SesionService.poseeElRol(RolesDelSistema.Administrador)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
