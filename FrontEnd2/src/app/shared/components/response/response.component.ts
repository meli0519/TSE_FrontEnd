import { Component, OnInit } from '@angular/core';
import {ResponseService} from '../../service/SResponse/response.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  constructor(private resqService: ResponseService, private router: Router) { }
 
  listRequest: any
  ngOnInit(): void {
   
   
    this.resqService.getAllRequest().subscribe( (data: any) =>{
      this.listRequest = data;
    })

  }


  viewContent(id: number){
     console.log(id);
    this.router.navigate(['/main/viewRequest',id]); 
  }
}
