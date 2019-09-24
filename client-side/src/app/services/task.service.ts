import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService:ApiService) { }

  createList(title: string){
    return this.apiService.post(`lists`,{title})
  }

  getLists(){
    return this.apiService.get("lists");
  }

  getTasks(listId:string){
    return this.apiService.get(`lists/${listId}/tasks`);
  }
}
