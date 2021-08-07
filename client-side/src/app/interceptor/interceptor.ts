import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError, empty, Subject, observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {
  refreshingAccessToken=false;
  accessTokenRefreshed : Subject<any> = new Subject(); 
  constructor(private authSservice:AuthService) { }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<any>{
    req = this.addAuthHeader(req);



    return next.handle(req).pipe(
      catchError(error =>{
        console.log(error);
        
        if(error.status === 401){

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

    if(this.refreshingAccessToken){

      return new Observable(observer=>{
        this.accessTokenRefreshed.subscribe(()=>{
          observer.next();
          observer.complete();
        })
      })
    }else{
      this.refreshingAccessToken =true;
      return this.authSservice.getNewAccessToken().pipe(
        tap(()=>{

          this.refreshingAccessToken =false;
          console.log("Accress token refreshed");
          this.accessTokenRefreshed.next();
        })
      )
    }

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
