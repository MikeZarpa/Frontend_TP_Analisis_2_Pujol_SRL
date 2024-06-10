import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pais } from 'src/app/class/models/pais';
import { Provincia } from 'src/app/class/models/provincia';
import { FuncionesUtiles } from 'src/app/class/utils/funciones-utiles';
import { UbicacionService } from 'src/app/services/UbicacionService/ubicacion.service';
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

  @Input() id:number|null = null;
  @Input() editMode :boolean = false;
  @Input() datosEdit!:Provincia;
  @Input() paisAlQuePertenece!:Pais;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  constructor(){    
    this.provinciaForm = this.formBuilder.group({
      id: [this.id],
      nombre:[""],
      pais: this.formBuilder.group({id:[null]}
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
    paisForm.patchValue({id:this.paisAlQuePertenece.id})

    if(this.editMode)
      this.cargarDatos();
  }

  cargarDatos(){
    this.provinciaForm.patchValue({
      id:this.datosEdit.id,
      nombre:this.datosEdit.nombre,
    })
    
  }

  enviarFormulario(event:Event){
    event.preventDefault();
    let datos= Object.assign({},this.provinciaForm.value);
    datos = FuncionesUtiles.convertirCamposAMayusculas(datos);
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
