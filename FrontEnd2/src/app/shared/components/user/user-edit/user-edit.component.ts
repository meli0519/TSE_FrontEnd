import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/shared/service/SUser/user-service.service';
import { DepartmentServiceService } from 'src/app/shared/service/SDepartment/department-service.service';
import { DepartmentI } from 'src/app/shared/models/department.interface';
import { DomSanitizer } from '@angular/platform-browser'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  editUser: FormGroup;
  departamentos: DepartmentI[];
  distritos: any;
  user: any;
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

  constructor(public dialog: MatDialogRef<UserEditComponent>, @Inject(MAT_DIALOG_DATA) public message: string,
    private service: UserServiceService, public fb: FormBuilder, private router: Router,
    private route: ActivatedRoute, private sanitizer: DomSanitizer, private depserv: DepartmentServiceService) {

    this.user = this.message;
    this.editUser = this.createFormGroup();

  }

  ngOnInit(): void {
    this.fillForm();
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

  fillForm() {
    console.log(this.user.user.cedula);
    this.editUser.get('cedula').setValue(this.user.user.cedula);
    this.editUser.get('nombre').setValue(this.user.user.nombre);
    this.editUser.get('apellidos').setValue(this.user.user.apellidos);
    this.editUser.get('fechaNacimiento').setValue(this.user.user.fechaNacimiento);
    this.editUser.get('sexo').setValue(this.user.user.sexo);
    this.editUser.get('departamento').setValue(this.user.user.departamento);
    this.editUser.get('distrito').setValue(this.user.distrito);
    this.editUser.get('correo').setValue(this.user.user.correo);
    this.editUser.get('pasword').setValue(this.user.user.pasword);
    this.editUser.get('celular').setValue(this.user.user.celular);
    this.editUser.get('foto').setValue(this.user.user.foto);
    this.preview = this.user.user.foto;
  }



  getFile(e): any {
    const archivo = e.target.files[0];
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    if (!allowedExtensions.exec(archivo.name)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El formato no esta permitido!',
        footer: '<a>Solo formatos .jpg|.jpeg|.png|.gif</a>'
      })

      this.editUser.get('foto').setValue('');

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

  editUserForm() {
    const user = {
      id: this.user.user.id_usuario,
      cedula: this.editUser.value.cedula,
      nombre: this.editUser.value.nombre,
      apellidos: this.editUser.value.apellidos,
      fechaNacimiento: this.editUser.value.fechaNacimiento,
      id_sexo: this.editUser.value.sexo,
      id_departamento: this.editUser.value.departamento,
      id_distrito: this.editUser.value.distrito,
      correo: this.editUser.value.correo,
      pasword: this.editUser.value.pasword,
      celular: this.editUser.value.celular,
      foto: this.preview
    }

    this.service.updateUser(user).subscribe((res: any) => {
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


