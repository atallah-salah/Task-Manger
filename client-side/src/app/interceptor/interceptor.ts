import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {
  refreshingAccessToken=false;
  constructor(private authSservice:AuthService) { }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<any>{
    req = this.addAuthHeader(req);

    return next.handle(req).pipe(
      catchError(error =>{
        console.log(error);
        
        if(error.status === 401 && !this.refreshingAccessToken){

          return this.refreshAccessToken().pipe(
            switchMap(()=>{
              req = this.addAuthHeader(req);
              return next.handle(req);
            }),
            catchError((error:any)=>{
              console.log(error);
              this.authSservice.logout();
              return empty();
            })
          )
        }
        return throwError(error);
      })
    )
  }

  refreshAccessToken(){
    this.refreshingAccessToken =true;

    return this.authSservice.getNewAccessToken().pipe(
      tap(()=>{
        this.refreshingAccessToken =false;
        console.log("Accress token refreshed");
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
