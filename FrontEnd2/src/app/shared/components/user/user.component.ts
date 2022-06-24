import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAddComponent } from '../user/user-add/user-add.component'
import { UserEditComponent } from '../user/user-edit/user-edit.component'
import { UserI } from '../../models/user.interface'
import { UserServiceService } from '../../service/SUser/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: UserI[];

  constructor(private service: UserServiceService, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getUsers().subscribe((result: any) => {
      this.users = result;
      console.log(this.users);
    })
  }

  deleteUser(id: number) {

    Swal.fire({
      title: `Esta seguro de eliminar el usuario con la cedula ${id}?`,
      text: "Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.service.deleteUser(id).subscribe((res: any) => {
        this.ngOnInit();
      })
    })
  }

  editUser(user:any) {
    console.log(user);
  this. openEdit(user);
  }

  addUser() {
    this.openAdd();
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(UserAddComponent, {
      height: '450px',
      width: '900px',
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(`Dialog result ${result}`);
      this.ngOnInit();

    })
  }

  openEdit(user: any): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      height: '450px',
      width: '900px',
      data: {
        user:user
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      console.log(`Dialog result ${result}`);
      this.ngOnInit();

    })

  }

}
