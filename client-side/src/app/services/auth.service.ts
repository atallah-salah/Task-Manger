import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { shareReplay,tap } from "rxjs/operators";
import { HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService:ApiService,private router:Router) { 

  }

  login(email:string,password:string){
    return this.apiService.login(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        this.setSession(res.body._id,res.headers.get("x-access-token"),res.headers.get("x-refresh-token"));        
      })
    )
  }

  logout(){
    this.removeSession()
  }

  getAcessToken(){
    return localStorage.getItem("x-access-token");
  }

  setAccessToken(accessToken){
    localStorage.setItem("x-access-token",accessToken)
  }

  private setSession(userId:string,accessToken:string,refreshToken:string){
    localStorage.setItem("user-id",userId);
    localStorage.setItem("access-token",accessToken);
    localStorage.setItem("refresh-token",refreshToken);
  }


  private removeSession(){
    localStorage.removeItem("user-id");
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  }
}
