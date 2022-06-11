import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/shared/service/SUser/user-service.service';
import { UserIEnv } from 'src/app/shared/Models/user.interface';
import { DepartmentI } from 'src/app/shared/Models/department.interface';
import { DepartmentServiceService } from 'src/app/shared/service/SDepartment/department-service.service';
import { DomSanitizer } from '@angular/platform-browser'

declare var M: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addUser: FormGroup;
  user: UserIEnv;
  departamentos: DepartmentI[];

  public preview:string;

  createFormGroup() {

    return new FormGroup({

      cedula: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9 ]{1,8}$')]),

      nombre: new FormControl('', [Validators.required,
      Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,15}$')]),

      apellidos: new FormControl('', [Validators.required,
      Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,15}$')]),

      fechaNacimiento: new FormControl('', [Validators.required]),

      sexo: new FormControl('', [Validators.required]),

      departamento: new FormControl('', [Validators.required]),

      distrito: new FormControl('', [Validators.required]),

      correo: new FormControl('', [Validators.required, Validators.email]),

      pasword: new FormControl('', [Validators.required,
      Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]{1,15}$')]),

      celular: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9 ]{1,9}$')]),

      foto: new FormControl('', [Validators.required]),

    });

  }

  constructor(public dialog: MatDialogRef<AddComponent>, @Inject(MAT_DIALOG_DATA) public message: string,
    private service: UserServiceService, private depserv: DepartmentServiceService,
    public fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

    this.addUser = this.createFormGroup();

  }

  ngOnInit(): void {
    this.getDepartment();

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  getDepartment() {
    this.depserv.getDepartment().subscribe((res: any) => {
      this.departamentos = res;
    })
  }

  getFile(e): any {
    const archivo = e.target.files[0];
    this.base64(archivo).then((img:any)=>{
      this.preview= img.base;
    })
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

  }
  get cedula() { return this.addUser.get('cedula'); }
  get nombre() { return this.addUser.get('nombre'); }
  get apellidos() { return this.addUser.get('apellidos'); }
  get correo() { return this.addUser.get('correo'); }
  get pasword() { return this.addUser.get('contrasena'); }
  get celular() { return this.addUser.get('contrasena'); }

}
