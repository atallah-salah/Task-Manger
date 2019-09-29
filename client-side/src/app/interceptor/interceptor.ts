import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

  constructor(private authSservice:AuthService) { }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<any>{
    req = this.addAuthHeader(req);

    return next.handle(req).pipe(
      catchError(error =>{
        console.log(error);
        

        return throwError(error);
      })
    )
  }

  addAuthHeader(req:HttpRequest<any>){
    const token = this.authSservice.getAcessToken();
  
    if(token){
      return req.clone({
        setHeaders:{
          "x-access-token":token
        }
      })
    }
    return req;
  }
}
