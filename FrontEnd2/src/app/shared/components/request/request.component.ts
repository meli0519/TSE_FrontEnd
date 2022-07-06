import { Component, OnInit } from '@angular/core';
import { RequestServiceService } from '../../service/SRequest/request-service.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
declare var $:any
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  suscription: Subscription;
  clasificadores: any;
  addRequest: FormGroup;
  archivosReq: Array<string> = [];
  nombresFile: Array<string> = [];
  solicitudes: any;

  createFormGroup() {

    return new FormGroup({
      destinatario: new FormControl('empresa@gmail.com', [Validators.required]),
      asunto: new FormControl('', [Validators.required]),
      clasificador: new FormControl('0', [Validators.required]),
      texto: new FormControl('', [Validators.required])
    });

  }

  constructor(private service: RequestServiceService, public fb: FormBuilder, private router: Router) {
    this.addRequest = this.createFormGroup();
  }

  ngOnInit(): void {
    this.getclasificadores();
    this.getSolicitudes();

    this.suscription = this.service.refresh$().subscribe(() =>{
      this.getSolicitudes();
    })
  }

  getSolicitudes(){
    this.service.getSolicitudes().subscribe((res: any) => {
      this.solicitudes = res;
    })
  }

  getclasificadores() {
    this.service.getClasificadores().subscribe((res: any) => {
      this.clasificadores = res;
    })
  }

  getFiles(e): any {
    const archivos = e.target.files;
    
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif|.docx|.xlsx|.pdf|.txt)$/i;
    if (archivos) {
     
      for(let i=0; i<archivos.length; i++) {
        
        if (!allowedExtensions.exec(archivos[i].name)) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El formato no esta permitido!',
            footer: '<a>Solo formatos .jpg|.jpeg|.png|.gif|.docx|.xlsx|.pdf|.txt</a>'
          })

        } else {
         
          this.base64(archivos[i]).then((img: any) => {
            this.archivosReq.push(img.base);
            this.nombresFile.push(archivos[i].name);
          })
        }

      }
     
    }
  }

  base64 = async ($e: any) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($e);

      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  })

   async addRequestForm() {
    const request = {
      fecha_hora: new Date(),
      id_usuario: localStorage.getItem("token"),
      palabra_clave: this.addRequest.value.asunto,
      asunto_detallado: this.addRequest.value.texto,
      id_clasificador: this.addRequest.value.clasificador,
      cantidad_archivos: this.archivosReq.length
    }
   this.service.addRequest(request).subscribe((res: any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'tu solicitud ha sido enviada',
        showConfirmButton: false,
        timer: 1500
      }) 

      this.addRequest.get('asunto').setValue('');
      this.addRequest.get('texto').setValue('');
      this.addRequest.get('clasificador').setValue(0);
      
      
      $("#myModal").modal('hide');
    })
   

    if(this.archivosReq){
      for(let i = 0; i < this.archivosReq.length;i++){
        const archivo = {
          linea: i+1,
          archivo: this.archivosReq[i],
          comentario:this.nombresFile[i],
          id_usuario:localStorage.getItem("token"),
          fecha_hora: request.fecha_hora
        }          
      await this.service.addArchivos(archivo).subscribe((res: any)=>{

        })
      }
      this.nombresFile.splice(0);
      this.archivosReq.splice(0);
    }
  }

  deleteFile(nombreFile: string){
    let position = this.nombresFile.indexOf(nombreFile);
    this.nombresFile.splice(position,1);
    this.archivosReq.splice(position,1);
  }

}
