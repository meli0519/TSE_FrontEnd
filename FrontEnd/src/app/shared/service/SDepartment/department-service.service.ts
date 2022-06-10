import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {DepartmentI} from '../../Models/department.interface'
@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  URL = 'http://localhost:3000/login/';

  constructor(private http:HttpClient) { }



  getDepartment(): Observable<any> {

    return this.http.get<DepartmentI>(this.URL+'getDepartment');
  }


  deleteDepartmentByID(idDepartment: number){

    return this.http.delete(URL+'deleteDepartment'+idDepartment);
  }
}
