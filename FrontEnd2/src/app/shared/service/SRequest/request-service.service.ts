import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import {tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  private _refresh$ = new Subject<void>();
  URL = 'http://localhost:3000/request/';

  constructor(private http:HttpClient) { }

  refresh$(){
    return this._refresh$;
  }

  addRequest(request: any): Observable<any>{
    console.log(request)
    return this.http.post(this.URL+'addRequest',request)
    .pipe(
      tap(() =>{
        this._refresh$.next();
      })
    );
  }

  addArchivos(archivos: any): Observable<any>{
    return this.http.post(this.URL+'addArchivos',archivos);
  }

  getClasificadores(): Observable<any>{
    return this.http.get(this.URL+'getClasificador');
  }

  getSolicitudes(): Observable<any>{
    return this.http.get(this.URL+'getSolicitudes');
  }

  
}
