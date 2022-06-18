import { Injectable } from '@angular/core';
import {LoginI} from '../models/login.interface';
import {ResponseI} from '../models/login.response'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
@Injectable({

  providedIn: 'root'
})
export class LoginServiceService {
  URL = 'http://localhost:3000/login/';

  constructor(private http:HttpClient) { }

  sendLogin(form:LoginI): Observable<ResponseI>{
   
    return this.http.post<ResponseI>(this.URL+'check',form);

  }
}