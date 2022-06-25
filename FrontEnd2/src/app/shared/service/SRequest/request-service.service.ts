import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  URL = 'http://localhost:3000/request/';

  constructor(private http:HttpClient) { }

  addRequest(request: any): Observable<any>{
    console.log(request)
    return this.http.post(this.URL+'addRequest',request);
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
