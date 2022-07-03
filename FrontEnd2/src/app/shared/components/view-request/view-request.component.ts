import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {ResponseService} from '../../service/SResponse/response.service';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private reqService: ResponseService) { }

  id_solicitud: any;
  solicitud: any ={
    fecha_hora: '',
    palabra_clave: '',
    asunto_detallado: '',
    nombre: '',
    descripcion: ''
  };
 

  ngOnInit(): void {
    this.id_solicitud = this.route.snapshot.paramMap.get("id_solicitud");
    console.log(this.id_solicitud);
    this.reqService.getRequestForId(this.id_solicitud).subscribe(data =>{
      this.solicitud = data;
      console.log(this.solicitud);
    })
  }

  recibidos(){
    this.router.navigate(['/main/response']); 
  }

}
