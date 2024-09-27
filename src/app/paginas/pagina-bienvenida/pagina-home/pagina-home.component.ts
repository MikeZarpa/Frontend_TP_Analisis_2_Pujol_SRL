
import { Component, inject, OnInit } from '@angular/core';
import { PATHS } from 'src/app/app-routing.module';
import { RolesDelSistema } from 'src/app/clases/enums';
import { AlertasStockService } from 'src/app/servicios/informes_y_alertas/alertas/alertas-stock.service';
import { AlertasVencimientoService } from 'src/app/servicios/informes_y_alertas/alertas/alertas-vencimiento.service';

import { SesionService } from 'src/app/servicios/sesion/sesion.service';


@Component({
  selector: 'app-pagina-home',
  templateUrl: './pagina-home.component.html',
  styleUrls: ['./pagina-home.component.css']
})
export class PaginaHomeComponent implements OnInit {
  ngOnInit(): void {
    this.consultar_falta_stock();
    this.consultar_vto_stock();
  }
  readonly servicioDeSesion = inject(SesionService);
  readonly servicioDeAlertaStock = inject(AlertasStockService);
  readonly servicioDeAlertaVencimiento= inject(AlertasVencimientoService);
  readonly PATHS = PATHS;

  consultar_falta_stock(){
    if(this.servicioDeSesion.poseeElRol(RolesDelSistema.Administrador)){
      this.servicioDeAlertaStock.consultar_si_faltan_productos();
      
    }
  }
  consultar_vto_stock(){
    if(this.servicioDeSesion.poseeElRol(RolesDelSistema.Administrador)){
      this.servicioDeAlertaVencimiento.consultar_si_se_acercan_vencimientos();
    }
  }
}
