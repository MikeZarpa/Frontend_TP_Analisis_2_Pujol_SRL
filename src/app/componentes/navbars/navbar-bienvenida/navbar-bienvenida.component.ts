import { Component, inject } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-bienvenida',
  templateUrl: './navbar-bienvenida.component.html',
  styleUrls: ['./navbar-bienvenida.component.css']
})
export class NavbarBienvenidaComponent {
  readonly servicioDeSesion = inject(SesionService);

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
