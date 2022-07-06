import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  URL = 'http://localhost:3000/response/';

  constructor(private http:HttpClient) { }


  getAllRequest(): Observable<any> {

    return this.http.get(this.URL+'getAllRequest');
  }

  getRequestForId(id: number): Observable<any> {

    return this.http.get(this.URL+'getRequestForId/'+id);
  }

  getDocuments(id: number): Observable<any> {
    return this.http.get(this.URL+'getDocuments/'+id);
  }

  getAllResponseStatus(): Observable<any> {

    return this.http.get(this.URL+'getAllResponseState');
  }

  addResponse(response: any): Observable<any>{
    return this.http.post(this.URL+'/addResponse',response);
  }
}
