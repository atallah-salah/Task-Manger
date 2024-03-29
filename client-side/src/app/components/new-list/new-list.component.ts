import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  title:any = "";

  constructor(private taskService:TaskService,private router:Router) { }

  ngOnInit() {
  }
  

changeInput({target:{value}}) {
  this.title=value
  }


  createNewList(title:string){
    this.taskService.createList(title).subscribe((list:List)=>{
      this.router.navigate(['/lists',list._id])
    })
  }
}
