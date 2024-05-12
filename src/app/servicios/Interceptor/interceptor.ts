import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Aquí puedes agregar lógica adicional si necesitas modificar la solicitud antes de enviarla
    // Por ejemplo, puedes agregar encabezados, realizar manipulaciones en la URL, etc.
    
    // En este ejemplo, simplemente pasamos la solicitud al siguiente manejador sin modificarla
    return next.handle(request);
  }
}