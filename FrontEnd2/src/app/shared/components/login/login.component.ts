import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';
import {LoginServiceService } from '../../service/login-service.service';
import {Router } from '@angular/router';
import {LoginI} from '../../models/login.interface';
import {ResponseI} from '../../models/login.response';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private service:LoginServiceService, private router: Router) { }

  ngOnInit(): void {
  } 

  onLogin(form: LoginI){
    this.service.sendLogin(form).subscribe(data =>{
      console.log(data);
      let dataResponse: ResponseI = data
      if(dataResponse != null){
      localStorage.setItem("token", dataResponse.id_usuario.toString());
      localStorage.setItem("departament",dataResponse.id_departamento.toString());
      this.router.navigate(['main'])
      
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error en la contraseña o usuario',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}


