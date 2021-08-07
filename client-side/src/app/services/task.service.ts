import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';
import { shareReplay, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService:ApiService) { }
  
  getLists(){
    return this.apiService.get("lists");

    // return this.apiService.get("lists").pipe(
    //       shareReplay(),
    //       tap(
    //         (res: HttpResponse<any>) => {
    //           return res
    //         },
    //         ({ error }) => error
    //       )
    //     );
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

  updateList(id: string,title:string){
    return this.apiService.patch(`lists/${id}`,{title});
  }

  createTask(title:string,listId:string){
    return this.apiService.post(`lists/${listId}/tasks`,{title})
  }

  completeTask(task:Task){
    return this.apiService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      "completed":!task.completed
    })
  }

  deleteTask(listId:string,taskId:string){
    return this.apiService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  updateTask(listId: string,taskId: string,title:string){
    return this.apiService.patch(`lists/${listId}/tasks/${taskId}`,{title});
  }

}
