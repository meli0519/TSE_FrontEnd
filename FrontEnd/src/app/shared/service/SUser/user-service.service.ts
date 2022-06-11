import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { UserI } from '../../Models/user.interface'
@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  URL = 'http://localhost:3000/usuario/';

  constructor(private http:HttpClient) { }

  getUsers(): Observable<any> {

    return this.http.get<UserI>(this.URL+'get');
  }

  deleteUser(id: number){

    return this.http.delete(URL+'delete/'+id);
  }
}
