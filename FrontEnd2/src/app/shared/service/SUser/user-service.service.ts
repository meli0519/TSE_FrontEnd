import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { UserI} from '../../models/user.interface'
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

    return this.http.delete(this.URL+'delete/'+id);
  }

  sendUser(user: any): Observable<any>{
    console.log(user);
    return this.http.post(this.URL+'add',user);
  }

  updateUser(user: any): Observable<any>{
    console.log(user);
    return this.http.put(this.URL+'update',user);
  }

  getDistritos(): Observable<any>{
    return this.http.get(this.URL+'getDistritos');
  }

}
