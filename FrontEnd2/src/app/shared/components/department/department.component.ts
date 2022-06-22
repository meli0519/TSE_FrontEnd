import { Component, OnInit } from '@angular/core';
import {DepartmentServiceService} from '../../service/SDepartment/department-service.service';
import {DepartmentI} from '../..//models/department.interface';

import Swal from 'sweetalert2'
import {Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private service: DepartmentServiceService, private router: Router) { }

  distritos: any
  department: any;
  
  ngOnInit(): void { 
    this.getData();
  }

  getData(){
    this.service.getDepartment().subscribe((res: any) => {
     this.department = res;
     
   }) 
 }

 sendDepartment(){
  this.router.navigate(['/main/addDepartment']); 
}

 editDepartment(idDepartment: Number){
  console.log(idDepartment);
}

 deleteDepartment(idDepartment: number){
  console.log(idDepartment);

  Swal.fire({
    title: 'Esta seguro de eliminar?',
    text: "Esta acción es irreversible!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Eliminado exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    }
    
     this.service.deleteDepartmentByID(idDepartment).subscribe((res: any) => {
      console.log('eliminado exitosamente')
      this.ngOnInit();
    }) 
  })
}

}

