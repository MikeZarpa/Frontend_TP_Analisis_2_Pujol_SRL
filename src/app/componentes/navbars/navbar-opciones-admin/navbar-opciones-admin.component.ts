import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/app-routing.module';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-opciones-admin',
  templateUrl: './navbar-opciones-admin.component.html',
  styleUrls: ['./navbar-opciones-admin.component.css']
})
export class NavbarOpcionesAdminComponent {
  readonly router = inject(Router);
  readonly PATHS = PATHS;
  readonly servicioSesion = inject(SesionService);

  por_implementar(){
    Swal.fire(
      {
        icon:'info',
        title:"Lo sentimos",
        titleText:"Aun estamos trabajando por emplementar esa funcionalidad.",
        showConfirmButton:true,
        timer:3000,
        timerProgressBar:true,
        backdrop:true,
      })
  }

  refresh(event:Event) {
    event.preventDefault();
    FuncionesUtiles.refresh(this.router);
  }
}
