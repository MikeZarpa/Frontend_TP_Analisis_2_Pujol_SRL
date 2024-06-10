import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Localidad } from 'src/app/class/models/localidad';
import { Provincia } from 'src/app/class/models/provincia';
import { FuncionesUtiles } from 'src/app/class/utils/funciones-utiles';
import { UbicacionService } from 'src/app/services/UbicacionService/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-localidad',
  templateUrl: './edit-localidad.component.html',
  styleUrls: ['./edit-localidad.component.css']
})
export class EditLocalidadComponent {
  formBuilder = inject(FormBuilder);
  UbicServ = inject(UbicacionService)
  localidadForm: FormGroup;

  @Input() id:number|null = null;
  @Input() editMode :boolean = false;
  @Input() datosEdit!:Localidad;
  @Input() provinciaAlQuePertenece!:Provincia;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  constructor(){    
    this.localidadForm = this.formBuilder.group({
      id: [this.id],
      nombre:[""],
      provincia: this.formBuilder.group({id:[null]},),
      codigo_postal: [""],
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
    const provinciaForm = this.localidadForm.get('provincia') as FormGroup;
    provinciaForm.patchValue({id:this.provinciaAlQuePertenece.id})
    if(this.editMode)
      this.cargarDatos();
  }

  cargarDatos(){
    this.localidadForm.patchValue({
      id:this.datosEdit.id,
      nombre:this.datosEdit.nombre,
      codigo_postal:this.datosEdit.codigo_postal,
      provincia:this.datosEdit.provincia?.id,
    })
    
  }

  enviarFormulario(event:Event){
    event.preventDefault();

    let datos= Object.assign({},this.localidadForm.value);
    datos = FuncionesUtiles.convertirCamposAMayusculas(datos);
    this.UbicServ.saveLocalidad(datos).subscribe(res=>{
      //console.log(res);
      
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
