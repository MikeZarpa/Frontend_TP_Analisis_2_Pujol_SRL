import { Component, inject } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-pagina-bienvenida',
  templateUrl: './pagina-bienvenida.component.html',
  styleUrls: ['./pagina-bienvenida.component.css']
})
export class PaginaBienvenidaComponent {
  readonly servicioDeSesion = inject(SesionService);
}
