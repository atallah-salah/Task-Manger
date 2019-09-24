import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService:ApiService) { }
  
  getLists(){
    return this.apiService.get("lists");
  }

  getTasks(listId:string){
    return this.apiService.get(`lists/${listId}/tasks`);
  }

  createList(title: string){
    return this.apiService.post(`lists`,{title})
  }

  createTask(title:string,listId:string){
    return this.apiService.post(`lists/${listId}/tasks`,{title})
  }

}
