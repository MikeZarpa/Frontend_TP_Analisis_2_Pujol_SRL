import { HttpErrorResponse } from "@angular/common/http";

export class RespuestaDeError{
    constructor(httpErrorResponse:HttpErrorResponse){
        try {            
            this.error_id = httpErrorResponse.error.result.error_id;
            this.error_msg = httpErrorResponse.error.result.error_msg; 
        } catch (error) {
            this.error_id = "Desconocido";
            this.error_msg = "Error en la creacion del mensaje";
        }
    }
    error_id:string;
    error_msg:string;
}