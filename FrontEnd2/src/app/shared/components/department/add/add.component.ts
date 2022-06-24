import { Component, Inject, OnInit } from '@angular/core';
import {DepartmentServiceService} from '../../../service/SDepartment/department-service.service';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  distritos: any;
  cantones: any;
  
  departmentForm = new FormGroup({
    department: new FormControl('', Validators.required),
    selectProvincia: new FormControl(0, Validators.required),
    selectCanton: new FormControl({value: 0,disabled:true},Validators.required),
    selectDistrit: new FormControl({value: 0,disabled:true},Validators.required),
    
  });
  constructor(private service: DepartmentServiceService) { }

  ngOnInit(): void {
    
  }

  
  sendDepartment(form: any){
    
    let newDepartment ={
    descripcion: form.department,
    id_distrito: Number(form.selectDistrit),
    id_pais: 1
   }
    
   this.service.sendDepartment(newDepartment).subscribe(data =>{
    console.log(data);
  });
   
  }


  onChangeProvincia(){
     this.departmentForm.get("selectCanton").enable();
    this.service.getCantones(this.departmentForm.get("selectProvincia").value).subscribe((res: any) => {
     
     this.cantones = res;
    })  
  }
  onChangeCanton(){
    this.departmentForm.get("selectDistrit").enable();
    this.service.getDistritos(this.departmentForm.get("selectCanton").value)
    .subscribe((res: any) => {
      
      this.distritos = res;
      
    }) 
    
  }
  
}
