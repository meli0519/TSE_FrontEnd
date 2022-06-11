import { Component, OnInit } from '@angular/core';
import {DepartmentServiceService} from '../../service/SDepartment/department-service.service';
import {DepartmentI} from '../..//Models/department.interface';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';
declare var M: any
import Swal from 'sweetalert2'
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  distritos: any
  department: any;
  departmentForm = new FormGroup({
    department: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    selectDistrit: new FormControl('', Validators.required)
  });

  constructor(private service: DepartmentServiceService ) { }

  ngOnInit(): void {

    var elems = document.querySelectorAll('select');
     M.FormSelect.init(elems);

    console.log("entro");
    this.getDistrito();
    this.getData();
   
  }

  getData(){
     this.service.getDepartment().subscribe((res: any) => {
      this.department = res;
      console.log(this.department)
    }) 
  }

  getDistrito(){
    this.service.getDistritos().subscribe((res: any) => {
      console.log(res);
      this.distritos = res;
      
    }) 
  }

  sendDepartment(form: any){
    this.service.sendDepartment(form).subscribe(data =>{
      console.log(data);
    });
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
      console.log(idDepartment);
       this.service.deleteDepartmentByID(idDepartment).subscribe((res: any) => {
        console.log('eliminado exitosamente')
        this.ngOnInit();
      }) 
    })
  }

}
