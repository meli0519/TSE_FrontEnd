import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { DepartmentComponent } from '../../components/department/department.component';
import { PruebaComponent } from '../../components/prueba/prueba.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DepartmentComponent,
    PruebaComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule

  ]
})
export class MainModule { }
