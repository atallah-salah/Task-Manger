import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { shareReplay,tap } from "rxjs/operators";
import { HttpResponse, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService:ApiService,private router:Router,private http:HttpClient) { 

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

    this.router.navigate(["/login"]);
  }

  getAcessToken(){
    return localStorage.getItem("x-access-token");
  }

  getRefreshToken(){
    return localStorage.getItem("x-refresh-token");
  }

  getUserId(){
    return localStorage.getItem("user-id");
  }

  setAccessToken(accessToken){
    localStorage.setItem("x-access-token",accessToken)
  }

  private setSession(userId:string,accessToken:string,refreshToken:string){
    localStorage.setItem("user-id",userId);
    localStorage.setItem("x-access-token",accessToken);
    localStorage.setItem("x-refresh-token",refreshToken);
  }


  private removeSession(){
    localStorage.removeItem("user-id");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-refresh-token");
  }

  getNewAccessToken(){
    return this.http.get(`${this.apiService.dataAPI}/users/me/access-token`,{
      headers:{
        "x-refresh-token":this.getRefreshToken(),
        "_id":this.getUserId()
      },
      observe:"response"
    }).pipe(
      tap((res:HttpResponse<any>)=>{
        this.setAccessToken(res.headers.get("x-access-token"))
      })
    )
  }

}
