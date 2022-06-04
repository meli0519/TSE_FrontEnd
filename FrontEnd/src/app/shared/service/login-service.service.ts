import { Injectable } from '@angular/core';
import {LoginI} from '../Models/login.interface';
import {ResponseI} from '../Models/login.response'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
@Injectable({

  providedIn: 'root'
})
export class LoginServiceService {
  URL = 'http://localhost:3000/login/';

  constructor(private http:HttpClient) { }

  sendLogin(form:LoginI): Observable<ResponseI>{
    console.log(form);
    return this.http.post<ResponseI>(this.URL+'check',form);

  }
}
