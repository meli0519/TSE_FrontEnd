import { Component, OnInit,Input } from '@angular/core';
import {DepartmentServiceService} from '../../../service/SDepartment/department-service.service';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';
declare var $:any


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
  constructor(private service: DepartmentServiceService,private router: Router) { 
   
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
    $("#myModal2").modal('hide');
   /*  let updateDepartment ={
      id_departamento: this.idDepartment,
      descripcion: form.department,
      id_distrito: Number(form.selectDistrit),
      id_pais: 1
    } 

      this.service.updateDepartment(updateDepartment).subscribe((data: any) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Departamento actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
       
      });    */
   
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
