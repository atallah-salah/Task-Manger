import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId:string;
  title:any = "";


  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router) { }
  
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.listId = params['listId'];
    })
  }

    changeInput({target:{value}}) {
    this.title=value
    }

  createNewTask(title:string){    
    this.taskService.createTask(title,this.listId).subscribe((newTask:Task)=>{
      this.router.navigate(['../'],{relativeTo:this.route})
    })
  }
}
