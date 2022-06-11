import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
declare var M: any
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

  constructor(private router: Router) { }

  ngOnInit(): void {

    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
     var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems); 
   
    if(localStorage.getItem("departament") === "1"){
     console.log("entro")
      this.permiss["visibility"] = this.estado
    }
   
  }


  exit() {
    this.router.navigate(['/'])
  }

}
