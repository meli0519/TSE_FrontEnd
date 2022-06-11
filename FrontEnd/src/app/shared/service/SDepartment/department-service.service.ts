import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {DepartmentI} from '../../Models/department.interface'
@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  URL = 'http://localhost:3000/department/';

  constructor(private http:HttpClient) { }



  getDepartment(): Observable<any> {

    return this.http.get<DepartmentI>(this.URL+'getDepartment');
  }

  sendDepartment(department: any): Observable<any>{
    return this.http.post(URL+'sendDepartment',department);
  }


  deleteDepartmentByID(idDepartment: number){
    console.log(this.URL+'deleteDepartment/'+idDepartment);
    //http://localhost:3000/department/deleteDepartment/16
    return this.http.delete(this.URL+'deleteDepartment/'+idDepartment);
  }

  getDistritos(): Observable<any>{
    console.log("entro a optener distritos");
    var result = this.http.get('http://localhost:3000/department/getDistrito');
    return result;
    
  }

}
