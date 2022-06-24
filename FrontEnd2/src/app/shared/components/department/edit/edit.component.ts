import { Component, OnInit,Input } from '@angular/core';
import {DepartmentServiceService} from '../../../service/SDepartment/department-service.service';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() idDepartment: number;
  distritos: any;
  cantones: any;
  stateDisabled: boolean;
  departmentForm = new FormGroup({
    department: new FormControl('', Validators.required),
    selectProvincia: new FormControl(0, Validators.required),
    selectCanton: new FormControl({value: 0,disabled:true},Validators.required),
    selectDistrit: new FormControl({value: 0,disabled:true},Validators.required),
    
  });
  constructor(private service: DepartmentServiceService) { 
    this.stateDisabled =false;
  }

  ngOnInit(): void {
    console.log(this.idDepartment);
    
  }

  ngOnChanges(): void{
    
    if(this.idDepartment != 0){
     
    
      this.getDataDepartment();
     
     
    } 
  }
  

  getDataDepartment(){
   
    this.service.getDepartmentForId(this.idDepartment).subscribe((res: any) => {
    
      this.departmentForm.get("department").setValue(res.descripcion);
      this.departmentForm.get("selectProvincia").setValue(res.idProvincia);
      this.onChangeProvincia();
      this.departmentForm.get("selectCanton").setValue(res.idCanton);
      this.onChangeCanton();
      this.departmentForm.get("selectDistrit").setValue(res.id_distrito); 
      this.stateDisabled=true;
  });
}

  sendDepartmentEdit(form: any){
   
    /* let newDepartment ={
    descripcion: form.department,
    id_distrito: Number(form.selectDistrit),
    id_pais: 1
   } 
    
    this.service.sendDepartment(newDepartment).subscribe(data =>{
    console.log(data);
  });  */
   
  }

  onChangeProvincia(){
    if(this.stateDisabled){
      this.departmentForm.get("selectCanton").enable();
    }
  
   this.service.getCantones(this.departmentForm.get("selectProvincia").value).subscribe((res: any) => {    
   this.cantones = res;
   })   
 }
 onChangeCanton(){
  if(this.stateDisabled){
    this.departmentForm.get("selectDistrit").enable();
  }
  
   this.service.getDistritos(this.departmentForm.get("selectCanton").value)
   .subscribe((res: any) => {
     
     this.distritos = res;
     
   }) 
   
 }

}
