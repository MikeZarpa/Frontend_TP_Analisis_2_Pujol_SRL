import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Usuario } from 'src/app/clases/base_de_datos/Usuario';
import { TipoDeComparacion } from 'src/app/clases/enums';
import { FiltroDetalle } from 'src/app/clases/dtos/filtro';
import { UsuarioService } from 'src/app/servicios/sesion/UsuarioService/usuario.service';

@Component({
  selector: 'app-barra-filtro-usuario',
  templateUrl: './barra-filtro-usuario.component.html',
  styleUrls: ['./barra-filtro-usuario.component.css']
})
export class BarraFiltroUsuarioComponent implements OnInit {
  @Input() filtroDetalle!:FiltroDetalle<any>
  @Input() campo_id_usuario!:number;
  @Output() eventoEmision: EventEmitter<void> = new EventEmitter<void>();

  readonly servicioDeUsuarios = inject(UsuarioService);
  opciones:Usuario[] = [];
  constructor(){
    this.servicioDeUsuarios.obtenerTodosSinPagina().subscribe(
      res=>this.opciones=res
    )
  }
  get opcionesNombre(){
    return this.opciones.map(usuario => usuario.apellido + " " + usuario.nombre);
  }
  get opcionesValores(){
    return this.opciones.map(usuario => usuario.id_usuario);
  }
  ngOnInit(): void {
    this.filtroDetalle.terminosDeBusqueda = [''];
  }

  emitir(){
    this.filtroDetalle.campo = this.campo_id_usuario;
    this.filtroDetalle.tipoBusqueda = TipoDeComparacion.LITERAL;
    this.eventoEmision.emit();
  }
}
