import { Component, OnDestroy, OnInit } from '@angular/core';
import {DepartmentServiceService} from '../../service/SDepartment/department-service.service';
import {DepartmentI} from '../..//models/department.interface';
import Swal from 'sweetalert2'
import {Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  suscription: Subscription;
  idDepartment: number;
  distritos: any
  department: any;
   
  constructor(private service: DepartmentServiceService, private router: Router) {
    this.idDepartment =0;
   }

  ngOnInit(): void { 
    this.getData();

    this.suscription = this.service.refresh$().subscribe(() =>{
      this.getData();
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  getData(){
    this.service.getDepartment().subscribe((res: any) => {
     this.department = res;
     
   }) 
 }

 sendDepartment(){
  this.router.navigate(['/main/addDepartment']); 
}

 editDepartment(idDepartment: number){ 
   this.idDepartment=idDepartment; 
}

 deleteDepartment(idDepartment: number){
 

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
    }) 
  })
}

}

