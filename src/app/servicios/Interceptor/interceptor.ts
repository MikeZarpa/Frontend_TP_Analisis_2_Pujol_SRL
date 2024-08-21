
import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { SesionService } from '../sesion.service';
import { TokenService } from '../token.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  readonly tokenService = inject(TokenService);
  readonly sesionService = inject(SesionService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if(!this.tokenService.esta_logueado()){
      return next.handle(req);
    }

    //Si estamos logueados (existe token), lo añadimos al header.
    const TOKEN = "Bearer " + this.tokenService.obtener_token();
    let intReq = req;
    console.log("AÑAdido token");
    console.log("Header",JSON.stringify(req.headers));
    intReq = req.clone({headers:req.headers.set('Authorization',TOKEN)});
    return next.handle(intReq).pipe(
      catchError((err:HttpErrorResponse)=>{
        if(err.status==200){
          console.log("Extraño error status 200", err);
          alert("!");
          return of();
        }

        if(err.status==406){
          this.sesionService.cerrarSesion();
        }

        return throwError(() => err);
      }));
  }
}