import { Router } from "@angular/router";
import Swal from "sweetalert2";

export class FuncionesUtiles{
  static convertirCamposAMayusculas(obj: any): any {
      if (obj && typeof obj === 'object') {
        for (const prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === 'string') {
              obj[prop] = obj[prop].toUpperCase();
            } else if (typeof obj[prop] === 'object') {
              obj[prop] = this.convertirCamposAMayusculas(obj[prop]);
            }
          }
        }
      }
      return obj;
  }
  static CartelDeRealizandoOperación(){
      Swal.fire({
        title:'Procesando...',
        icon:'info',
        showConfirmButton:false,
        timer:1000,
        timerProgressBar:false,
    })
  }
  
  static CartelDeOperaciónRealizada(){
    Swal.fire({
      title:'Realizado',
      icon:'success',
      showConfirmButton:false,
      timer:1000,
      timerProgressBar:false,
    })
  }

  static refresh(router:Router){
    Swal.fire({icon:'info', title:"Recargando",timer:750,timerProgressBar:true,showConfirmButton:false})
    
    const currentUrl = router.url; // Agrega un parámetro al final de la URL
    router.navigateByUrl("/bienvenido", { skipLocationChange: true }).then(() => {
      router.navigate([currentUrl]); // Navega de nuevo a la URL original sin cambiar el estado del historial
    });
  }
}