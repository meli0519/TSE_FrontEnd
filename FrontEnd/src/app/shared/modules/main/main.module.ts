import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule }from '@angular/material/button'
import { DepartmentComponent } from '../../components/department/department.component';
import { PruebaComponent } from '../../components/prueba/prueba.component';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { UserComponent } from '../../components/user/user.component';
import { AddComponent } from '../../components/user/add/add.component';
import { EditComponent } from '../../components/user/edit/edit.component';

@NgModule({
  declarations: [
    DepartmentComponent,
    PruebaComponent,
    UserComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule
    
    

  ]
})
export class MainModule { }
