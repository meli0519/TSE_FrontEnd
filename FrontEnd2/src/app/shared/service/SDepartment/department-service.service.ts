import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {DepartmentI} from '../../models/department.interface'
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
    return this.http.post(this.URL+'sendDepartment',department);
  }


  deleteDepartmentByID(idDepartment: number){
    
    return this.http.delete(this.URL+'deleteDepartment/'+idDepartment);
  }

  getDistritos(): Observable<any>{
   
    var result = this.http.get(this.URL+'getDistrito');
    return result;
    
  }

}