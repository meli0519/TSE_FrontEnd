import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { DepartmentComponent } from '../../components/department/department.component';
import { UserComponent } from '../../components/user/user.component';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule }from '@angular/material/button'
 
import { UserAddComponent } from '../../components/user/user-add/user-add.component';
import { UserEditComponent } from '../../components/user/user-edit/user-edit.component';
import { AddComponent } from '../../../shared/components/department/add/add.component';
import { EditComponent } from '../../../shared/components/department/edit/edit.component';

@NgModule({
  declarations: [
    DepartmentComponent,
    UserComponent,
    UserAddComponent,
    UserEditComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class MainModule { }
