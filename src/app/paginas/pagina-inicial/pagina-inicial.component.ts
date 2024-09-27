import { Component, inject } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent {
  readonly servicioDeSesion = inject(SesionService);
}
