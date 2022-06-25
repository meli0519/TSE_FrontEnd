import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  estado = true
 
  
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("departament") === "1"){
       this.estado=false;
     }
  }

}
