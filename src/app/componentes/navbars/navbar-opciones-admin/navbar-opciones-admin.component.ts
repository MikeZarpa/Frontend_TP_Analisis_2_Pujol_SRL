import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-opciones-admin',
  templateUrl: './navbar-opciones-admin.component.html',
  styleUrls: ['./navbar-opciones-admin.component.css']
})
export class NavbarOpcionesAdminComponent {
  readonly router = inject(Router);

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
}
