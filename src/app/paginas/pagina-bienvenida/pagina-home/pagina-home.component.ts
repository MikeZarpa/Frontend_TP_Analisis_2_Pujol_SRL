import { Component, inject } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-pagina-home',
  templateUrl: './pagina-home.component.html',
  styleUrls: ['./pagina-home.component.css']
})
export class PaginaHomeComponent {
  readonly servicioDeSesion = inject(SesionService);
}
