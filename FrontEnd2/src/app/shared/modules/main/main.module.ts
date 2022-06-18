import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DepartmentComponent } from '../../components/department/department.component';
import {HttpClientModule} from '@angular/common/http';
/* import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule }from '@angular/material/button'
 */
@NgModule({
  declarations: [
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
