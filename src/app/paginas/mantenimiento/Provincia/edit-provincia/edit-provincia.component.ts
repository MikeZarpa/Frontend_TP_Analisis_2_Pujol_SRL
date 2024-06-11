import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pais } from 'src/app/clases/base_de_datos/ubicacion/Pais';
import { Provincia } from 'src/app/clases/base_de_datos/ubicacion/Provincia';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-provincia',
  templateUrl: './edit-provincia.component.html',
  styleUrls: ['./edit-provincia.component.css']
})
export class EditProvinciaComponent {
  formBuilder = inject(FormBuilder);
  UbicServ = inject(UbicacionService)
  provinciaForm: FormGroup;

  @Input() id_provincia:number|null = null;
  @Input() editMode :boolean = false;
  @Input() datosEdit!:Provincia;
  @Input() paisAlQuePertenece!:Pais;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  constructor(){    
    this.provinciaForm = this.formBuilder.group({
      id_provincia: [this.id_provincia],
      descripcion:[""],
      pais: this.formBuilder.group({id_pais:[null]}
      )
    });  
  }
  ponerEnMayusculas(e:any){
    let el = e.target;
    let start = el.selectionStart;
    let end = el.selectionEnd;
    el.value = el.value.toUpperCase();
    el.setSelectionRange(start, end);
}
  ngOnInit(): void {

    //@Input se activa luego del constructor...
    const paisForm = this.provinciaForm.get('pais') as FormGroup;
    paisForm.patchValue({id_pais:this.paisAlQuePertenece.id_pais})

    if(this.editMode)
      this.cargarDatos();
  }

  cargarDatos(){
    this.provinciaForm.patchValue({
      id_provincia:this.datosEdit.id_provincia,
      descripcion:this.datosEdit.descripcion,
    })
    
  }

  enviarFormulario(event:Event){
    event.preventDefault();
    let datos= Object.assign({},this.provinciaForm.value);
    datos = FuncionesUtiles.convertirCamposAMayusculas(datos);
    datos.id_pais = this.paisAlQuePertenece.id_pais;
    this.UbicServ.saveProvincia(datos).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Realizado Exitosamente',
        allowOutsideClick:true,
        backdrop:true,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        toast: false,
        showClass: {
          popup: 'animated bounceIn' // Agrega la animación "bounceIn"
        },
        hideClass: {
          popup: 'animated bounceOut' // Agrega la animación "bounceOut"
        },
        });
    });
    this.emitirEnvioExitoso();
  }

  volverClick(){
    this.volver.emit();
  }
  emitirEnvioExitoso(){
    this.envioExitoso.emit();
  }
}
