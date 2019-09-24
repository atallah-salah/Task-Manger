import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  constructor(private taskService:TaskService) { }

  ngOnInit() {
  }
  
  createNewList(title:string){
    this.taskService.createList(title).subscribe((data)=>{
      console.log(data);

    })
  }

}
