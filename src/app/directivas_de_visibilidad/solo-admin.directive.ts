
import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { RolesDelSistema } from 'src/app/clases/enums';
import { SesionService } from '../servicios/sesion/sesion.service';

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
