import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService:ApiService) { }
  
  getLists(){
    return this.apiService.get("lists");
  }

  deleteList(id: string){
    return this.apiService.delete(`lists/${id}`);
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

  completeTask(task:Task){
    return this.apiService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      "completed":!task.completed
    })
  }

}
