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
}
