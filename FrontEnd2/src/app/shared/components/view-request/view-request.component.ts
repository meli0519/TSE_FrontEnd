import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseService } from '../../service/SResponse/response.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {


  addResponse: FormGroup;
  status:any;

  createFormGroup() {

    return new FormGroup({
      id_respuesta: new FormControl('6', [Validators.required]),
      texto: new FormControl('', [Validators.required])
    });

  }

  constructor(private route: ActivatedRoute, private router: Router, private reqService: ResponseService) {
    this.addResponse= this.createFormGroup();
   }

  id_solicitud: any;
  preview: string;
  documentos: any;
  solicitud: any = {
    fecha_hora: '',
    palabra_clave: '',
    cantidad_archivos: '',
    asunto_detallado: '',
    nombre: '',
    descripcion: '',
    estado: ''
  };


  ngOnInit(): void {
    this.id_solicitud = this.route.snapshot.paramMap.get("id_solicitud");
    console.log(this.id_solicitud);

    this.reqService.getRequestForId(this.id_solicitud).subscribe(data => {

      this.solicitud = data;
      console.log(this.solicitud);
      if (this.solicitud.cantidad_archivos > 0) {
        this.preview = 'Hay archivos';
        this.getDocuments(this.id_solicitud);
      }
    })

    this.getResponseStatus();
  }

  getDocuments(id: any) {
    this.reqService.getDocuments(id).subscribe(data => {
      this.documentos = data;
      console.log(this.documentos);
    })
  }

  getResponseStatus(){
    this.reqService.getAllResponseStatus().subscribe(data => {
      this.status=data;
    })
  }

  recibidos() {
    this.router.navigate(['/main/response']);
  }

  download(linea:any){
    let documento = this.documentos.find(x => x.linea == linea);
    let cadena = documento.comentario.split('.');
    let tipo = '.'+cadena[1];
  
    this.urltoFile(documento.archivo, documento.comentario, tipo);
  }

  urltoFile(url: string, filename: string, mimeType: string) {

    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
      .then((response) => {
        const url = window.URL
          .createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    );
  }

  addResponseForm() {
    const response = {
      id_solicitud: this.id_solicitud,
      id_respuesta: this.addResponse.value.id_respuesta,
      detalle_respuesta: this.addResponse.value.texto,
      fecha_hora_respuesta: new Date(),
      id_usuario_respuesta: localStorage.getItem("token"),
    }
    console.log( response);
    this.reqService.addResponse(response).subscribe((res: any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'tu solicitud ha sido enviada',
        showConfirmButton: false,
        timer: 1500
      }) 
     // this.router.navigate(['/main/request']);
    }) 
  }


}
