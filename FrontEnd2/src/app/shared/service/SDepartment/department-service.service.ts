import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
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

  updateDepartment(department: any): Observable<any>{
    return this.http.put(this.URL+'updateDepartment',department);
  }

  deleteDepartmentByID(idDepartment: number){
    
    return this.http.delete(this.URL+'deleteDepartment/'+idDepartment);
  }

  getDistritos(id: number): Observable<any>{
   
    var result = this.http.get(this.URL+'getDistrito/'+id);
    return result;
    
  }

  getDepartmentForId(id: number): Observable<any>{
   
    var result = this.http.get(this.URL+'getDepartmentForId/'+id);
    return result;
    
  }

  getCantones(id: number): Observable<any>{
   
    var result = this.http.get(this.URL+'getCantones/'+id);
    return result;
    
  }

}