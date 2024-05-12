import { Component, inject } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-inicial',
  templateUrl: './navbar-inicial.component.html',
  styleUrls: ['./navbar-inicial.component.css']
})
export class NavbarInicialComponent {
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
        backdrop:false,
        
      })
  }
}
