import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskService:TaskService) { }

  ngOnInit() {
  }

  createNewList(){
    this.taskService.createList(`test`).subscribe((data)=>{
      console.log(data);
      
    })
  }
}
