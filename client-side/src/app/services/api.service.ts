import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly dataAPI:string = 'http://localhost:8080/';
  
  constructor(private http:HttpClient) { }

  get(url:string){
    return this.http.get(`${this.dataAPI}/${url}`);
  };

  post(url:string,payload:Object){
    return this.http.post(`${this.dataAPI}/${url}`,payload);
  }

  patch(url:string,payload:Object){
    return this.http.patch(`${this.dataAPI}/${url}`,payload);
  }

  delete(url:string){
    return this.http.delete(`${this.dataAPI}/${url}`);
  }

}
