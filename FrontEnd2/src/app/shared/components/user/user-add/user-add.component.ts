import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/shared/service/SUser/user-service.service';
import { DepartmentServiceService } from 'src/app/shared/service/SDepartment/department-service.service';
import { DepartmentI } from 'src/app/shared/models/department.interface';
import { DomSanitizer } from '@angular/platform-browser'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  addUser: FormGroup;
  departamentos: DepartmentI[];
  distritos: any;
  public preview: string;

  createFormGroup() {

    return new FormGroup({

      cedula: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      departamento: new FormControl('', [Validators.required]),
      distrito: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      pasword: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      foto: new FormControl('', [Validators.required]),
    });

  }

  constructor(public dialog: MatDialogRef<UserAddComponent>, @Inject(MAT_DIALOG_DATA) public message: string,
    private service: UserServiceService, public fb: FormBuilder, private router: Router,
    private route: ActivatedRoute, private sanitizer: DomSanitizer, private depserv: DepartmentServiceService) {

    this.addUser = this.createFormGroup();
  }

  ngOnInit(): void {

    this.getDepartment();
    this.getDistritos();

  }

  getDepartment() {
    this.depserv.getDepartment().subscribe((res: any) => {
      this.departamentos = res;
    })
  }

  getDistritos() {
    this.service.getDistritos().subscribe((res: any) => {
      this.distritos = res;
    }) 
  }

  getFile(e): any {
    const archivo = e.target.files[0];
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    console.log(archivo);
    if (!allowedExtensions.exec(archivo.name)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El formato no esta permitido!',
        footer: '<a>Solo formatos .jpg|.jpeg|.png|.gif</a>'
      })

      this.addUser.get('foto').setValue('');

    } else {
      this.base64(archivo).then((img: any) => {
        this.preview = img.base;
      })
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

  addUserForm() {

    const user = {
      cedula: this.addUser.value.cedula,
      nombre: this.addUser.value.nombre,
      apellidos: this.addUser.value.apellidos,
      fechaNacimiento: this.addUser.value.fechaNacimiento,
      id_sexo: this.addUser.value.sexo,
      id_departamento: this.addUser.value.departamento,
      id_distrito: this.addUser.value.distrito,
      correo: this.addUser.value.correo,
      pasword: this.addUser.value.pasword,
      celular: this.addUser.value.celular,
      foto: this.preview
    }
    this.service.sendUser(user).subscribe((res: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'tu usuario ha sido guardado',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialog.close();

    })


  }

}
