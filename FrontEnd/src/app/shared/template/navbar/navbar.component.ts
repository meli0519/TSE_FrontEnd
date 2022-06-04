import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  estado = "hidden"
  permiss ={
    "visibility": "visible"
  }

  constructor() { }

  ngOnInit(): void {
   
    if(localStorage.getItem("departament") === "1"){
     console.log("entro")
      this.permiss["visibility"] = this.estado
    }
   
  }

}
