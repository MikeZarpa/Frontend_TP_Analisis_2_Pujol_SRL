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
  static CartelDeCopiadoAlPortapapeles(asunto:string){
    Swal.fire({
      title:`Copiado ${asunto.toUpperCase()} en el Portapapeles`,
      text:`Presione:   Ctrl + V   para pegar el ${asunto.toUpperCase()} en donde se requiera.`,
      icon:'success',
      showConfirmButton:false,
      timer:4000,
      timerProgressBar:false,
      backdrop:false,
      toast:true,
      position:'bottom-right'
    })
  }
  static CopiarAlPortapapeles(cosa_a_guardar:string, asunto:string){
    // Crea un elemento de texto temporal
    var elemento_temporal = document.createElement('textarea');
    // Asigna el texto a guardar al elemento temporal
    elemento_temporal.value = cosa_a_guardar;
    // Asegúrate de que el elemento sea visible y esté dentro del DOM
    elemento_temporal.style.display = 'block';
    document.body.appendChild(elemento_temporal);
    // Selecciona y copia el texto al portapapeles
    elemento_temporal.select();
    document.execCommand('copy');
    // Remueve el elemento temporal después de copiar
    document.body.removeChild(elemento_temporal);
    this.CartelDeCopiadoAlPortapapeles(asunto);
  }
  static ObtenerFechaAAAA_MM_DD(fecha:Date = new Date()){
    let fechaActual = new Date(fecha);
    // Obtener los componentes de la fecha
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const dia = String(fechaActual.getDate()).padStart(2, '0');

    // Crear el formato deseado: AAAA-MM-DD
    const formatoDeseado = `${año}-${mes}-${dia}`;
    return formatoDeseado;
  }
  static ObtenerFechaDD_MM_AAAA_Excel(fecha:Date = new Date()){
    let fechaActual = new Date(fecha);
    // Obtener los componentes de la fecha
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const dia = String(fechaActual.getDate()).padStart(2, '0');

    // Crear el formato deseado: AAAA-MM-DD
    const formatoDeseado = `${dia}/${mes}/${año}`;
    return formatoDeseado;
  } 
  static Aniadir_diferencia_horaria(fecha:Date):Date{
    fecha.setHours(fecha.getHours() + 3);
    return fecha;
  }
  static Es_fin_de_semana(fecha: Date): boolean {
    return fecha.getDay() === 6 || fecha.getDay() === 0;
  }
  static Proximo_lunes_mas_cercano(fecha_fin_de_semana:Date):Date{
    const fecha = new Date(fecha_fin_de_semana);
    let diferencia = (fecha.getDay()===0) ? 1:2;
    fecha.setDate(fecha.getDate()+diferencia);
    return fecha;
  }
  static Anterior_viernes_mas_cercano(fecha_fin_de_semana:Date):Date{
    const fecha = new Date(fecha_fin_de_semana);
    let diferencia = (fecha.getDay()===0) ? 2:1;
    fecha.setDate(fecha.getDate() - diferencia);
    return fecha;
  }

  static Ultimo_dia_del_mes(fecha_con_un_mes:Date):Date{
    const fecha = new Date(fecha_con_un_mes);

    // Establecer la fecha en el último día del mes
    fecha.setDate(1); // Ir al primer día del mes
    fecha.setMonth(fecha.getMonth() + 1); // Ir al siguiente mes
    fecha.setDate(0); // Restar un día para llegar al último día del mes
  
    return fecha;  
  }
  static Ultimo_dia_laboral_del_mes(fecha_con_un_mes:Date):Date{
    const fecha = this.Ultimo_dia_del_mes(fecha_con_un_mes);
    if( this.Es_fin_de_semana(fecha)){
      return this.Anterior_viernes_mas_cercano(fecha);
    }
    return fecha;
  }
  static Sobre_pasa_el_mes(fecha_con_un_mes:Date, fecha_a_evaluar:Date):boolean{
    return fecha_con_un_mes.getMonth() < fecha_a_evaluar.getMonth();
  }
  static formatearTextoArchivoAFecha(texto: string): Date {
    // Asumiendo que el formato es YYMMDD
    const año = "20" + texto.slice(0, 2);
    const mes = texto.slice(2, 4);
    const dia = texto.slice(4, 6);
  
    // Formatear la fecha
    const fechaFormateada = `${año}-${mes}-${dia}`;
  
    return new Date(fechaFormateada);
  } 

  static refresh(router:Router){
    Swal.fire({icon:'info', title:"Recargando",timer:750,timerProgressBar:true,showConfirmButton:false})
    
    const currentUrl = router.url; // Agrega un parámetro al final de la URL
    router.navigateByUrl("/bienvenido", { skipLocationChange: true }).then(() => {
      router.navigate([currentUrl]); // Navega de nuevo a la URL original sin cambiar el estado del historial
    });
  }
}