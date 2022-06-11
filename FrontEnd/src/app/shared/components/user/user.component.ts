import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../service/SUser/user-service.service';
import { UserI, UserIEnv } from '../../Models/user.interface'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../user/add/add.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  users: UserI[];
  user: UserIEnv;

  constructor(private service:UserServiceService, private router: Router,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.service.getUsers().subscribe((result: any) => {
      this.users = result;
      console.log( this.users);
    })
  }

  deleteUser(id:number){
    this.service.deleteUser(id).subscribe((res:any)=>{
    this.router.navigate(['/user']);
   })
  }

  editUser(id:number){

  }

  addUser(){
    this.openAdd();
  }

  openAdd():void{
    console.log('HOLI');
    const dialogRef = this.dialog.open(AddComponent,{
      height:'450px',
      width:'900px',
    });

    dialogRef.afterClosed().subscribe(result =>{

      console.log(`Dialog result ${result}`);

    })
  }

}
