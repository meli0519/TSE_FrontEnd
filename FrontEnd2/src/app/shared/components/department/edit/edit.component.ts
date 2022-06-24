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
    selectCanton: new FormControl({value: 0},Validators.required),
    selectDistrit: new FormControl({value: 0},Validators.required),
    
  });
  constructor(private service: DepartmentServiceService) { 
   
  }

  ngOnInit(): void {
   
    
  }

  ngOnChanges(): void{
    
    if(this.idDepartment != 0){
     
      this.stateDisabled=false;
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
     
      
     
   
      
  });
}



  sendDepartmentEdited(form: any){   
  
    let updateDepartment ={
      id_departamento: this.idDepartment,
      descripcion: form.department,
      id_distrito: Number(form.selectDistrit),
      id_pais: 1
    } 

    console.log(updateDepartment);
    
    

      this.service.updateDepartment(updateDepartment).subscribe((data: any) =>{
     
      });   
   
  }

  onChangeProvincia(){
   
   this.service.getCantones(this.departmentForm.get("selectProvincia").value).subscribe((res: any) => {    
   this.cantones = res;    
        if(this.stateDisabled){
          this.departmentForm.get("selectCanton").setValue(0);
          this.departmentForm.get("selectDistrit").setValue(0); 
          this.departmentForm.get("selectDistrit").disable();
        }  
   })   
 }

 onChangeCanton(){
   
   this.service.getDistritos(this.departmentForm.get("selectCanton").value)
   .subscribe((res: any) => {    
     this.distritos = res;
  
      if(this.stateDisabled){
        this.departmentForm.get("selectDistrit").setValue(0); 
        this.departmentForm.get("selectDistrit").enable();
      }
      this.stateDisabled=true;
    
   }) 
   
 }

}
