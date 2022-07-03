import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {DepartmentI} from '../../models/department.interface';
import {tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  URL = 'http://localhost:3000/department/';
  private _refresh$ = new Subject<void>();
  constructor(private http:HttpClient) { }

  refresh$(){
    return this._refresh$;
  }

  getDepartment(): Observable<any> {

    return this.http.get<DepartmentI>(this.URL+'getDepartment');
  }

  sendDepartment(department: any): Observable<any>{
    return this.http.post(this.URL+'sendDepartment',department)
    .pipe(
      tap(() =>{
        this._refresh$.next();
      })
    );
  }

  updateDepartment(department: any): Observable<any>{
    return this.http.put(this.URL+'updateDepartment',department)
    .pipe(
      tap(() =>{
        this._refresh$.next();
      })
    );
  }

  deleteDepartmentByID(idDepartment: number){
    
    return this.http.delete(this.URL+'deleteDepartment/'+idDepartment)
    .pipe(
      tap(() =>{
        this._refresh$.next();
      })
    );
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